const logger = require('../utils/logger');

function performance(req, res, next) {
  const start = new Date();
  next();
  res.on('finish', () => {
    const end = new Date();
    const time = end - start;
    const performance = time / 1000;

    logger.info({ route: req.originalUrl, method: req.method, timeInSeconds: performance }, 'Performance Monitoring');
  });
}

module.exports = {
  performance
};
