const express = require('express');
const router = express.Router();
const SensorSpecController = require('../controllers/SensorSpecController');

router.get('/index', SensorSpecController.getAll);
router.post('/save', SensorSpecController.create);
router.put('/update/:id', SensorSpecController.update);
router.delete('/delete/:id', SensorSpecController.delete);

module.exports = router;
