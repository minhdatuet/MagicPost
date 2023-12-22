const express = require('express');
const transactionPointController = require('../controllers/transactionpoint.js');

const router = express.Router();

router.post('/create', transactionPointController.create);
router.get('/get/all', transactionPointController.getAll);
router.put('/update/:id', transactionPointController.updateById);

module.exports = router;
