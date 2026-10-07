// frontend/src/views/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="container py-5">
      {/* Banner Principal */}
      <div className="p-5 mb-4 bg-light rounded-3 border shadow-sm text-center">
        <div className="container-fluid py-3">
          <h1 className="display-4 fw-bold text-primary mb-3">
            📚 Sistema de Gestión de Biblioteca Universitaria
          </h1>
          <p className="col-md-10 fs-5 mx-auto text-secondary mb-4">
            Plataforma académica centralizada para la administración de usuarios y consulta del catálogo bibliográfico institucional.
          </p>
          
          {user ? (
            <div className="d-flex justify-content-center gap-3">
              <Link to="/books" className="btn btn-primary btn-lg px-4 fw-semibold">
                Explorar Catálogo de Libros
              </Link>
              {user.rol === 'admin' && (
                <Link to="/users" className="btn btn-outline-dark btn-lg px-4 fw-semibold">
                  Gestión de Usuarios
                </Link>
              )}
            </div>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              <Link to="/login" className="btn btn-primary btn-lg px-4 fw-semibold">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-outline-primary btn-lg px-4 fw-semibold">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tarjetas de Módulos Destacados */}
      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-3">
            <div className="card-body">
              <div className="fs-1 text-primary mb-2">👥</div>
              <h4 className="card-title fw-bold">Módulo 1: MOD_USUARIOS</h4>
              <p className="card-text text-muted">
                Gestión integral del ciclo de vida de usuarios (Administradores y Usuarios Regulares). Incluye autorregistro, autenticación segura y administración de roles.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-3">
            <div className="card-body">
              <div className="fs-1 text-success mb-2">📖</div>
              <h4 className="card-title fw-bold">Módulo 2: MOD_LIBROS</h4>
              <p className="card-text text-muted">
                Control completo del catálogo bibliográfico. Permite registrar nuevos materiales, consultar disponibilidad en tiempo real, filtrar por categoría y buscar por ISBN.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;