// backend/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * MÓDULO 2: MOD_LIBROS (5 funcionalidades)
 */

// Funcionalidad 10: Consultar todos los libros (Soporta query params para búsqueda y filtros)
router.get('/', bookController.getAllBooks);

// Funcionalidad 11: Consultar libro por ID
router.get('/:id', bookController.getBookById);

// Funcionalidad 9: Registrar libro
router.post('/', bookController.createBook);

// Funcionalidad 12: Actualizar libro
router.put('/:id', bookController.updateBook);

// Funcionalidad 13: Eliminar libro
router.delete('/:id', bookController.deleteBook);

module.exports = router;