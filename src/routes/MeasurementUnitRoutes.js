const express = require('express');
const router = express.Router();
const MeasurementUnitController = require('../controllers/MeasurementUnitController');

// CRUD
router.get('/index', MeasurementUnitController.getAll);
router.get('/show/:id', MeasurementUnitController.show);
router.post('/save', MeasurementUnitController.create);
router.put('/update/:id', MeasurementUnitController.update);
router.delete('/delete/:id', MeasurementUnitController.delete);

module.exports = router;
