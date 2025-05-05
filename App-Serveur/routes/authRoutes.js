const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const verifyToken = require('../middelware/verifyToken');

// Registro e inicio de sesión
router.post('/signUp', authController.signUp);
router.post('/login', authController.login); // Login sigue generando token

// Rutas protegidas
router.put('/update-password', verifyToken, authController.updatePassword);
router.delete('/delete-account', verifyToken, authController.deleteAccount);

module.exports = router;

