const SensorSpecService = require('../services/SensorSpecService');
const logger = require('../utils/logger');

module.exports = {
  async getAll(req, res) {
    try {
      const models = req.app.locals.models;
      const list = await SensorSpecService.getAll(models);
      return res.status(200).json(list);
    } catch (error) {
      logger.error(error, 'Error fetching sensor specifications');
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const models = req.app.locals.models;
      const newSpec = await SensorSpecService.create(req.body, models);
      return res.status(201).json(newSpec);
    } catch (error) {
      logger.error(error, 'Error creating sensor specification');
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const models = req.app.locals.models;
      await SensorSpecService.update(req.params.id, req.body, models);
      return res.status(200).json({ message: 'Link updated successfully!' });
    } catch (error) {
      logger.error(error, 'Error updating sensor specification');
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const models = req.app.locals.models;
      await SensorSpecService.delete(req.params.id, models);
      return res.status(200).json({ message: 'Deleted successfully!' });
    } catch (error) {
      logger.error(error, 'Error deleting sensor specification');
      return res.status(500).json({ error: error.message });
    }
  }
};
