const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.listAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.patch('/deactivate/:id', UserController.inactivate);
router.patch('/activate/:id', UserController.activate);

module.exports = router;
