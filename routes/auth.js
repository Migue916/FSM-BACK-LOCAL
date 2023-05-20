// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para la autenticación de usuarios
router.post('/login', authController.login);

// Ruta para la renovación de tokens
router.post('/refresh', authController.refreshToken);

module.exports = router;

