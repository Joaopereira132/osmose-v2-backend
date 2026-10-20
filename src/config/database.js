const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('./config.json');

class Database {
  constructor() {
    const env = process.env.NODE_ENV || 'development';
    const dbConfig = config[env];

    this.connection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      port: dbConfig.port || 3306,
      dialect: dbConfig.dialect,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });
  }

  async connect() {
    try {
      await this.connection.authenticate();
      logger.info(`MySQL: Connection established in [${process.env.NODE_ENV || 'development'}] environment.`);
      await this.connection.sync();
      logger.info('MySQL: Tables synchronized successfully.');
    } catch (error) {
      logger.error(error, 'Error connecting to MySQL');
      process.exit(1);
    }
  }

  async connectMongo() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      logger.info('MongoDB: Connection established successfully.');
    } catch (error) {
      logger.error(error, 'Error connecting to MongoDB');
    }
  }
}

module.exports = new Database();
