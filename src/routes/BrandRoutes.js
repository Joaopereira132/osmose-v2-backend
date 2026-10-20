const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/BrandController');

// Brand Routes
router.get('/index', BrandController.getAll);
router.get('/show/:id', BrandController.show);
router.post('/save', BrandController.create);
router.put('/update/:id', BrandController.update);
router.delete('/delete/:id', BrandController.delete);

module.exports = router;
