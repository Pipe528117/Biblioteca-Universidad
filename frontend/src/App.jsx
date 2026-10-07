// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Vistas
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import UserManagement from './views/UserManagement';
import BookManagement from './views/BookManagement';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        {/* Barra de navegación superior */}
        <Navbar />

        {/* Contenido principal según la ruta */}
        <main className="flex-grow-1">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Ruta Protegida: Módulo MOD_LIBROS (Accesible para todos los usuarios autenticados) */}
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BookManagement />
                </ProtectedRoute>
              }
            />

            {/* Ruta Protegida: Módulo MOD_USUARIOS (Exclusivo para perfil Administrador) */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            {/* Redirección por defecto ante rutas desconocidas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Pie de página */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;