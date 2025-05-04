const express = require('express');
const { handleInterestForm } = require('../controllers/email.controller');

const router = express.Router();

router.post('/interest', handleInterestForm);

module.exports = router;
