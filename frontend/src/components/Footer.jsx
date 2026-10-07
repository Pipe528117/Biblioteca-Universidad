// frontend/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Sistema de Gestión de Biblioteca Universitaria
        </p>
        <p className="text-muted small mb-0">
          Ingeniería Web II | UNIMINUTO
        </p>
      </div>
    </footer>
  );
};

export default Footer;