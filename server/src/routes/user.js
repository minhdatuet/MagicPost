const express = require('express');
const userController = require('../controllers/user.js');
const verifyToken = require('../middleware/verifytoken.js');

const router = express.Router();

router.use(verifyToken)
router.get('/get/user', userController.getUser);

module.exports = router;