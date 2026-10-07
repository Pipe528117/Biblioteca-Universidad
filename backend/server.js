// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Registro de rutas API
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Ruta de comprobación del servidor
app.get('/', (req, res) => {
  res.json({
    message: 'API del Sistema de Gestión de Biblioteca Universitaria en ejecución',
    status: 'OK',
    version: '1.0.0'
  });
});

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'La ruta solicitada no existe en el servidor.'
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Servidor de la Biblioteca corriendo en puerto: ${PORT}`);
  console.log(`URL base: http://localhost:${PORT}`);
  console.log(`Endpoints Usuarios: http://localhost:${PORT}/api/users`);
  console.log(`Endpoints Libros:   http://localhost:${PORT}/api/books`);
  console.log(`====================================================`);
});