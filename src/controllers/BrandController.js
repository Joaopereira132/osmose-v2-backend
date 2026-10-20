const BrandService = require('../services/BrandService');
const logger = require('../utils/logger');

const BrandController = {
  async getAll(req, res) {
    try {
      const models = req.app.locals.models;
      const brandsList = await BrandService.getAll(models);
      return res.status(200).json(brandsList);
    } catch (error) {
      logger.error(error, 'Error fetching brands');
      return res.status(500).json({ error: 'Error fetching brands' });
    }
  },

  async show(req, res) {
    try {
      const models = req.app.locals.models;
      const brand = await BrandService.getById(req.params.id, models);
      if (!brand) return res.status(404).json({ error: 'Brand not found' });
      return res.status(200).json(brand);
    } catch (error) {
      logger.error(error, 'Error fetching brand');
      return res.status(500).json({ error: 'Error fetching brand' });
    }
  },

  async create(req, res) {
    try {
      const models = req.app.locals.models;
      const newBrand = await BrandService.create(req.body, models);
      return res.status(201).json({ message: 'Brand created successfully!', data: newBrand });
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
      const updatedBrand = await BrandService.update(req.params.id, req.body, models);
      return res.status(200).json({ message: 'Brand updated successfully!', data: updatedBrand });
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
      const deleted = await BrandService.delete(req.params.id, models);
      if (!deleted) return res.status(404).json({ error: 'Brand not found' });
      return res.status(200).json({ message: 'Brand deleted successfully!' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

module.exports = BrandController;
