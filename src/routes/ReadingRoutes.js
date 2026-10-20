const express = require('express');
const router = express.Router();
const ReadingController = require('../controllers/ReadingController');

router.get('/index', ReadingController.getAll);
router.post('/save', ReadingController.create);

module.exports = router;