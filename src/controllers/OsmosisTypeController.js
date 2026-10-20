const OsmosisTypeService = require('../services/OsmosisTypeService');
const logger = require('../utils/logger');

const OsmosisTypeController = {
  async getAll(req, res) {
    try {
      const models = req.app.locals.models;
      const typesList = await OsmosisTypeService.getAll(models);
      return res.status(200).json(typesList);
    } catch (error) {
      logger.error(error, 'Error fetching osmosis types');
      return res.status(500).json({ error: 'Error fetching osmosis types' });
    }
  },

  async show(req, res) {
    try {
      const models = req.app.locals.models;
      const type = await OsmosisTypeService.getById(req.params.id, models);
      if (!type) return res.status(404).json({ error: 'Osmosis type not found' });
      return res.status(200).json(type);
    } catch (error) {
      logger.error(error, 'Error fetching osmosis type by ID');
      return res.status(500).json({ error: 'Error fetching osmosis type' });
    }
  },

  async create(req, res) {
    try {
      const models = req.app.locals.models;
      const newType = await OsmosisTypeService.create(req.body, models);
      return res.status(201).json({ message: 'Osmosis type created successfully!', data: newType });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const models = req.app.locals.models;
      const updatedType = await OsmosisTypeService.update(req.params.id, req.body, models);
      if (!updatedType || updatedType === 0 || (Array.isArray(updatedType) && updatedType[0] === 0)) {
        return res.status(404).json({ error: 'Osmosis type not found.' });
      }
      return res.status(200).json({ message: 'Osmosis type updated successfully!' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const models = req.app.locals.models;
      const deletedCount = await OsmosisTypeService.delete(req.params.id, models);
      if (deletedCount === 0) return res.status(404).json({ error: 'Osmosis type not found.' });
      return res.status(200).json({ message: 'Osmosis type deleted successfully!' });
    } catch (error) {
      logger.error(error, 'Error deleting osmosis type');
      return res.status(500).json({ error: 'Error deleting osmosis type' });
    }
  }
};

module.exports = OsmosisTypeController;
