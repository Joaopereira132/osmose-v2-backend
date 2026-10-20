const UserService = require('../services/UserService');
const logger = require('../utils/logger');

const UserController = {
  listAll: async (req, res) => {
    try {
      const models = req.app.locals.models;
      const list = await UserService.listAll(models);
      res.json(list);
    } catch (error) {
      logger.error(error, 'Error fetching users');
      res.status(500).json({ success: false, message: 'Error fetching users.' });
    }
  },

  getById: async (req, res) => {
    try {
      const models = req.app.locals.models;
      const user = await UserService.getById(req.params.id, models);
      if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
      res.json(user);
    } catch (error) {
      logger.error(error, 'Error fetching user');
      res.status(500).json({ success: false, message: 'Error fetching user.' });
    }
  },

  update: async (req, res) => {
    try {
      const models = req.app.locals.models;
      const updated = await UserService.update(req.params.id, req.body, models);
      if (!updated) return res.status(404).json({ success: false, message: 'User not found.' });
      res.json({ success: true, message: 'User updated successfully!' });
    } catch (error) {
      logger.error(error, 'Error updating user');
      res.status(500).json({ success: false, message: 'Error updating user.' });
    }
  },

  inactivate: async (req, res) => {
    try {
      const models = req.app.locals.models;
      const deactivated = await UserService.inactivate(req.params.id, models);
      if (!deactivated) return res.status(404).json({ success: false, message: 'User not found.' });
      res.json({ success: true, message: 'User deactivated successfully!' });
    } catch (error) {
      logger.error(error, 'Error deactivating user');
      res.status(500).json({ success: false, message: 'Error deactivating user.' });
    }
  },

  activate: async (req, res) => {
    try {
      const models = req.app.locals.models;
      const activated = await UserService.activate(req.params.id, models);
      if (!activated) return res.status(404).json({ success: false, message: 'User not found.' });
      res.json({ success: true, message: 'User reactivated successfully!' });
    } catch (error) {
      logger.error(error, 'Error reactivating user');
      res.status(500).json({ success: false, message: 'Error reactivating user.' });
    }
  }
};

module.exports = UserController;
