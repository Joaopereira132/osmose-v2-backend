const MeasurementUnitService = require('../services/MeasurementUnitService');
const logger = require('../utils/logger');

const MeasurementUnitController = {
  async getAll(req, res) {
    try {
      const list = await MeasurementUnitService.getAll(req.app.locals.models);
      return res.status(200).json(list);
    } catch (error) {
      logger.error(error, 'Error fetching measurement units');
      return res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const unit = await MeasurementUnitService.getById(req.params.id, req.app.locals.models);
      if (!unit) return res.status(404).json({ error: 'Measurement unit not found.' });
      return res.status(200).json(unit);
    } catch (error) {
      logger.error(error, 'Error fetching measurement unit by ID');
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newUnit = await MeasurementUnitService.create(req.body, req.app.locals.models);
      return res.status(201).json({ message: 'Measurement unit created successfully!', data: newUnit });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      await MeasurementUnitService.update(req.params.id, req.body, req.app.locals.models);
      return res.status(200).json({ message: 'Measurement unit updated successfully!' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deletedCount = await MeasurementUnitService.delete(req.params.id, req.app.locals.models);
      if (deletedCount === 0) return res.status(404).json({ error: 'Measurement unit not found.' });
      return res.status(200).json({ message: 'Measurement unit deleted successfully!' });
    } catch (error) {
      logger.error(error, 'Error deleting measurement unit');
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = MeasurementUnitController;
