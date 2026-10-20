const HospitalService = require('../services/HospitalService');
const logger = require('../utils/logger');

const HospitalController = {
  async getAll(req, res) {
    try {
      const models = req.app.locals.models;
      const hospitalsList = await HospitalService.getAll(models);
      return res.status(200).json(hospitalsList);
    } catch (error) {
      logger.error(error, 'Error fetching hospitals');
      return res.status(500).json({ error: 'Error fetching hospitals' });
    }
  },

  async show(req, res) {
    try {
      const models = req.app.locals.models;
      const hospital = await HospitalService.getById(req.params.id, models);
      if (!hospital) return res.status(404).json({ error: 'Hospital not found' });
      return res.status(200).json(hospital);
    } catch (error) {
      logger.error(error, 'Error fetching hospital');
      return res.status(500).json({ error: 'Error fetching hospital' });
    }
  },

  async create(req, res) {
    try {
      const models = req.app.locals.models;
      const newHospital = await HospitalService.create(req.body, models);
      return res.status(201).json({ message: 'Hospital created successfully!', data: newHospital });
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
      const updatedHospital = await HospitalService.update(req.params.id, req.body, models);
      if (!updatedHospital) return res.status(404).json({ error: 'Hospital not found' });
      return res.status(200).json({ message: 'Hospital updated successfully!', data: updatedHospital });
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
      const deleted = await HospitalService.delete(req.params.id, models);
      if (!deleted) return res.status(404).json({ error: 'Hospital not found' });
      return res.status(200).json({ message: 'Hospital deleted successfully!' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

module.exports = HospitalController;
