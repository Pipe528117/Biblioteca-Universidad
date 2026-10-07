// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * MÓDULO 1: MOD_USUARIOS (8 funcionalidades)
 */

// Funcionalidad 1: Iniciar sesión
router.post('/login', userController.login);

// Funcionalidad 2: Cerrar sesión
router.post('/logout', userController.logout);

// Funcionalidad 3: Autorregistro público
router.post('/register', userController.register);

// Funcionalidad 5: Consultar todos los usuarios (Con soporte para barra de búsqueda y filtros)
router.get('/', userController.getAllUsers);

// Funcionalidad 6: Consultar usuario por ID
router.get('/:id', userController.getUserById);

// Funcionalidad 4: Registrar usuario por Administrador
router.post('/', userController.createUser);

// Funcionalidad 7: Actualizar usuario
router.put('/:id', userController.updateUser);

// Funcionalidad 8: Eliminar usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;