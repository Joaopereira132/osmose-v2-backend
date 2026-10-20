const express = require('express');
const router = express.Router();

// Import the controller
const HospitalController = require('../controllers/HospitalController');

router.get('/index', HospitalController.getAll);
router.get('/show/:id', HospitalController.show);
router.post('/save', HospitalController.create);
router.put('/update/:id', HospitalController.update);
router.delete('/delete/:id', HospitalController.delete);

module.exports = router;
