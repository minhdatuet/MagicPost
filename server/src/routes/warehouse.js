const express = require('express');
const warehouseController = require('../controllers/warehouse.js');

const router = express.Router();

router.post('/create', warehouseController.create);
router.get('/get/all', warehouseController.getAll);
router.delete('/delete/:id', warehouseController.deleteById);
router.put('/update/:id', warehouseController.updateById);

module.exports = router;
