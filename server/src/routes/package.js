const express = require('express');
const packageController = require('../controllers/package.js');

const router = express.Router();

router.post('/create', packageController.create);
router.get('/get/all', packageController.getAllPackages);

module.exports = router;
