const express = require('express');
const packageController = require('../controllers/package.js');

const router = express.Router();

router.post('/package/create', packageController.create);
// router.post('/login', authController.login);

module.exports = router;
