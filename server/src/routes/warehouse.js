const express = require('express');
const warehouseController = require('../controllers/warehouse.js');

const router = express.Router();

router.post('/create', warehouseController.create);
router.get('/get/all', warehouseController.getAll);

module.exports = router;
