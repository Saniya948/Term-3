const express = require('express');
const router = express.router();
const controller = require('../controllers/temperatureController');

router.get('/temperatures', controller.getAll);
router.get('/temperatures/:region', controller.getByRegion);
router.post('/temperatures', controller.add);

module.exports = router;
