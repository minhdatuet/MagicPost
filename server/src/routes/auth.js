const express = require('express');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.post('/create', authController.createAccount);
router.post('/login', authController.login);

router.put('/update/leader', authController.updateLeader);
router.post('/update/employee', authController.updateEmployee);

router.get('/get/employees', authController.getEmployees);
router.get('/get/user', authController.getUser);

module.exports = router;
