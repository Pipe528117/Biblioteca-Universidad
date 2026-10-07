// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente Guard para protección de rutas según autenticación y rol de usuario.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes/Vista a renderizar si cumple permisos
 * @param {Array<string>} [props.allowedRoles] - Lista de roles permitidos (ej. ['admin'])
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Obtener datos del usuario desde la sesión almacenada en localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 1. Verificar si el usuario está autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Verificar si el rol del usuario está autorizado para la ruta actual
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // Si es un usuario regular intentando acceder a una ruta de admin, redirigir al catálogo de libros
    return <Navigate to="/books" replace />;
  }

  // Si pasa todas las verificaciones, renderizar el componente protegido
  return children;
};

export default ProtectedRoute;