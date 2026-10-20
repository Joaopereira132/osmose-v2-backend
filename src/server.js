const express = require('express');
const path = require('path');
process.loadEnvFile(path.resolve(__dirname, '../.env'));
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const db = require('./config/database');
const initModels = require('./models/init-models');
const { runConsumer } = require('./kafka/ReadingConsumer');
const { performance } = require('./middlewares/Performance');
const { verifyToken } = require('./middlewares/AuthMiddleware');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());

// Segurança: CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Segurança: Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many attempts. Please try again in 15 minutes.' }
});

// Swagger: Documentação da API
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema Osmose V2',
      version: '1.0.0',
      description: 'Documentação Oficial da API'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js']
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

const startServer = async () => {
  try {
    logger.info('--- SISTEMA OSMOSE V2 ---');

    app.locals.models = initModels(db.connection);
    await db.connect();
    await db.connectMongo();

    runConsumer(app.locals.models);

    app.use(performance);

    // Rotas da API
    app.use('/api/auth', authLimiter, require('./routes/AuthRoutes'));
    app.use('/api/users', verifyToken, require('./routes/UserRoutes'));
    app.use('/api/hospital', verifyToken, require('./routes/HospitalRoutes'));
    app.use('/api/reading', verifyToken, require('./routes/ReadingRoutes'));
    app.use('/api/sensor', verifyToken, require('./routes/SensorRoutes'));
    app.use('/api/unit', verifyToken, require('./routes/OsmosisUnitRoutes'));
    app.use('/api/brand', verifyToken, require('./routes/BrandRoutes'));
    app.use('/api/osmosis-type', verifyToken, require('./routes/OsmosisTypeRoutes'));
    app.use('/api/sensor-brand', verifyToken, require('./routes/SensorBrandRoutes'));
    app.use('/api/sensor-spec', verifyToken, require('./routes/SensorSpecRoutes'));
    app.use('/api/specification', verifyToken, require('./routes/SpecificationRoutes'));
    app.use('/api/measurement-unit', verifyToken, require('./routes/MeasurementUnitRoutes'));

    // Tratamento de Erros
    app.use((err, req, res, next) => {
      logger.error(err, 'Unhandled error (Centralized Error Handler)');
      res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error.'
      });
    });

    const server = app.listen(3000, '0.0.0.0', () => {
      logger.info('Server running. Swagger documentation at http://localhost:3000/api-docs');
    });

    return server; // Retornamos o servidor para os testes o poderem ligar/desligar
  } catch (error) {
    logger.error(error, 'Critical error starting the server');
    process.exit(1);
  }
};

// Evita encravar a porta se este ficheiro for chamado pelos testes
if (require.main === module) {
  startServer();
}

// Exportamos a app e a função de arranque para o Supertest usar
module.exports = { app, startServer };
