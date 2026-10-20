const express = require('express');
const router = express.Router();
const SpecificationController = require('../controllers/SpecificationController');

router.get('/index', SpecificationController.getAll);
router.get('/show/:id', SpecificationController.show);
router.post('/save', SpecificationController.create);
router.put('/update/:id', SpecificationController.update);
router.delete('/delete/:id', SpecificationController.delete);

module.exports = router;