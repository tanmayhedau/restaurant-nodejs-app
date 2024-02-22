const express = require('express');
const { registerController, loginController } = require('../controllers/authControllers');
const router = express.Router();

// REGISTER || POST METHOD
router.post('/register', registerController);

// LOGIN || POST METHOD
router.post('/login', loginController);

module.exports = router;