const express = require('express');
const router = express.Router();
const SensorController = require('../controllers/SensorController');

// Sensor Routes
router.get('/index', SensorController.getAll);
router.get('/show/:id', SensorController.show);
router.post('/save', SensorController.create);
router.put('/update/:id', SensorController.update);
router.delete('/delete/:id', SensorController.delete);

module.exports = router;
