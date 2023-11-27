const express = require('express');
const packageController = require('../controllers/package.js');

const router = express.Router();

router.post('/package/create', packageController.create);
router.get('/package/get/all', packageController.getAllPackages);

module.exports = router;
