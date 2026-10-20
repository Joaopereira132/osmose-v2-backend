const SensorBrandService = require('../services/SensorBrandService');
const logger = require('../utils/logger');

const SensorBrandController = {
  async getAll(req, res) {
    try {
      const models = req.app.locals.models;
      const data = await SensorBrandService.getAll(models);
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error, 'Error fetching sensor brands');
      return res.status(500).json({ error: 'Error fetching sensor brands' });
    }
  },
  async create(req, res) {
    try {
      const models = req.app.locals.models;
      const newData = await SensorBrandService.create(req.body, models);
      return res.status(201).json(newData);
    } catch (error) {
      logger.error(error, 'Error creating sensor brand');
      return res.status(500).json({ error: 'Error creating sensor brand' });
    }
  },
  async update(req, res) {
    try {
      const models = req.app.locals.models;
      const updatedData = await SensorBrandService.update(req.params.id, req.body, models);
      if (updatedData) return res.status(200).json(updatedData);
      return res.status(404).json({ error: 'Brand not found' });
    } catch (error) {
      logger.error(error, 'Error updating sensor brand');
      return res.status(500).json({ error: 'Error updating brand' });
    }
  },
  async delete(req, res) {
    try {
      const models = req.app.locals.models;
      const deleted = await SensorBrandService.delete(req.params.id, models);
      if (deleted) return res.status(200).json({ message: 'Brand deleted successfully!' });
      return res.status(404).json({ error: 'Brand not found' });
    } catch (error) {
      logger.error(error, 'Error deleting sensor brand');
      return res.status(500).json({ error: 'Error deleting brand' });
    }
  }
};

module.exports = SensorBrandController;
