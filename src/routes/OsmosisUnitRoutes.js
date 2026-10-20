const express = require('express');
const router = express.Router();

const UnitController = require('../controllers/OsmosisUnitController');

// 5 CRUD routes
router.get('/index', UnitController.getAll);
router.get('/show/:id', UnitController.show);
router.post('/save', UnitController.create);
router.put('/update/:id', UnitController.update);
router.delete('/delete/:id', UnitController.delete);

module.exports = router;
