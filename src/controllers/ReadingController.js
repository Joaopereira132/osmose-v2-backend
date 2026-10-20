const ReadingService = require('../services/ReadingService');
const logger = require('../utils/logger');

module.exports = {
  async create(req, res) {
    try {
      const { sensorId, value, timestamp } = req.body;

      if (!sensorId || value === undefined) {
        return res.status(400).json({ error: 'Incomplete data. sensorId and value are required.' });
      }

      const newReading = await ReadingService.create({ sensorId, value, timestamp });
      return res.status(201).json(newReading);
    } catch (error) {
      logger.error(error, 'Error creating reading in MongoDB');
      return res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const list = await ReadingService.getAll();
      return res.status(200).json(list);
    } catch (error) {
      logger.error(error, 'Error fetching readings from MongoDB');
      return res.status(500).json({ error: error.message });
    }
  }
};
