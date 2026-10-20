const SensorService = require('../services/SensorService');
const logger = require('../utils/logger');

const SensorController = {
  async getAll(req, res) {
    try {
      const sensors = await SensorService.getAll(req.app.locals.models);
      res.status(200).json(sensors);
    } catch (error) {
      logger.error(error, 'Error fetching sensors');
      res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const sensor = await SensorService.getById(req.params.id, req.app.locals.models);
      if (!sensor) return res.status(404).json({ error: 'Sensor not found.' });
      res.status(200).json(sensor);
    } catch (error) {
      logger.error(error, 'Error fetching sensor by ID');
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newSensor = await SensorService.create(req.body, req.app.locals.models);
      res.status(201).json({ message: 'Sensor created successfully!', data: newSensor });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedSensor = await SensorService.update(req.params.id, req.body, req.app.locals.models);

      if (!updatedSensor || updatedSensor === 0 || (Array.isArray(updatedSensor) && updatedSensor[0] === 0)) {
        return res.status(404).json({ error: 'Sensor not found.' });
      }

      res.status(200).json({
        message: 'Sensor updated successfully!',
        data: typeof updatedSensor === 'object' && !Array.isArray(updatedSensor) ? updatedSensor : null
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await SensorService.delete(req.params.id, req.app.locals.models);
      if (result === 0) return res.status(404).json({ error: 'Sensor not found.' });
      res.status(200).json({ message: 'Sensor deleted successfully!' });
    } catch (error) {
      logger.error(error, 'Error deleting sensor');
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = SensorController;
