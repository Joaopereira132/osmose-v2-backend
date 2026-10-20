const express = require('express');
const router = express.Router();
const SensorBrandController = require('../controllers/SensorBrandController');

router.get('/index', SensorBrandController.getAll);
router.post('/save', SensorBrandController.create);
router.put('/update/:id', SensorBrandController.update);
router.delete('/delete/:id', SensorBrandController.delete);

module.exports = router;