// src/routes/auth.routes.js
const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/reset-password', authController.resetPassword);
router.post('/update-password', authController.updatePassword);

module.exports = router;