const express = require('express');
const router = express.Router();
const OsmosisTypeController = require('../controllers/OsmosisTypeController');

router.get('/index', OsmosisTypeController.getAll);
router.get('/show/:id', OsmosisTypeController.show);
router.post('/save', OsmosisTypeController.create);
router.put('/update/:id', OsmosisTypeController.update);
router.delete('/delete/:id', OsmosisTypeController.delete);

module.exports = router;
