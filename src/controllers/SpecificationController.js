const SpecificationService = require('../services/SpecificationService');
const logger = require('../utils/logger');

const SpecificationController = {
  async getAll(req, res) {
    try {
      const models = req.app.locals.models;
      const list = await SpecificationService.getAll(models);
      return res.status(200).json(list);
    } catch (error) {
      logger.error(error, 'Error fetching specifications');
      return res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const models = req.app.locals.models;
      const spec = await SpecificationService.getById(req.params.id, models);
      return spec ? res.status(200).json(spec) : res.status(404).json({ error: 'Specification not found' });
    } catch (error) {
      logger.error(error, 'Error fetching specification by ID');
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const models = req.app.locals.models;
      const newSpec = await SpecificationService.create(req.body, models);
      return res.status(201).json(newSpec);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors[0].message });
      }
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const models = req.app.locals.models;
      const updatedSpec = await SpecificationService.update(req.params.id, req.body, models);
      if (!updatedSpec || updatedSpec === 0 || (Array.isArray(updatedSpec) && updatedSpec[0] === 0)) {
        return res.status(404).json({ error: 'Specification not found' });
      }
      return res.status(200).json({ message: 'Specification updated successfully!' });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors[0].message });
      }
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const models = req.app.locals.models;
      const deletedCount = await SpecificationService.delete(req.params.id, models);
      if (deletedCount === 0) return res.status(404).json({ error: 'Specification not found' });
      return res.status(200).json({ message: 'Deleted successfully!' });
    } catch (error) {
      logger.error(error, 'Error deleting specification');
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = SpecificationController;
