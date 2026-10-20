const OsmosisUnitService = require('../services/OsmosisUnitService');
const logger = require('../utils/logger');

const UnitController = {
  async getAll(req, res) {
    try {
      const models = req.app.locals.models;
      const unitsList = await OsmosisUnitService.getAll(models);
      return res.status(200).json(unitsList);
    } catch (error) {
      logger.error(error, 'Error fetching units');
      return res.status(500).json({ error: 'Error fetching units' });
    }
  },

  async show(req, res) {
    try {
      const models = req.app.locals.models;
      const unit = await OsmosisUnitService.getById(req.params.id, models);
      if (!unit) return res.status(404).json({ error: 'Unit not found' });
      return res.status(200).json(unit);
    } catch (error) {
      logger.error(error, 'Error fetching unit');
      return res.status(500).json({ error: 'Error fetching unit' });
    }
  },

  async create(req, res) {
    try {
      const models = req.app.locals.models;
      const newUnit = await OsmosisUnitService.create(req.body, models);
      return res.status(201).json({ message: 'Unit created successfully!', data: newUnit });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const details = error.errors.map((err) => err.message);
        return res.status(400).json({ error: 'Validation error.', details });
      }
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const models = req.app.locals.models;
      const updatedUnit = await OsmosisUnitService.update(req.params.id, req.body, models);
      return res.status(200).json({ message: 'Unit updated successfully!', data: updatedUnit });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const details = error.errors.map((err) => err.message);
        return res.status(400).json({ error: 'Validation error.', details });
      }
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const models = req.app.locals.models;
      const deleted = await OsmosisUnitService.delete(req.params.id, models);
      if (!deleted) return res.status(404).json({ error: 'Unit not found' });
      return res.status(200).json({ message: 'Unit deleted successfully!' });
    } catch (error) {
      logger.error(error, 'Error deleting unit');
      return res.status(500).json({ error: 'Error deleting unit' });
    }
  }
};

module.exports = UnitController;
