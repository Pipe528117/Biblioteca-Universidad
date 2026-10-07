// frontend/src/components/ConfirmModal.jsx
import React from 'react';

/**
 * Componente Modal reusable para confirmar acciones destructivas (eliminaciones)
 * @param {Object} props
 * @param {boolean} props.isOpen - Estado para controlar la visibilidad del modal
 * @param {string} props.title - Título del modal
 * @param {string} props.message - Mensaje de advertencia detallado
 * @param {Function} props.onConfirm - Función que se ejecuta al confirmar
 * @param {Function} props.onCancel - Función que se ejecuta al cancelar o cerrar
 */
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title fw-bold">
              ⚠️ {title || 'Confirmar eliminación'}
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body py-4">
            <p className="mb-0 text-secondary">
              {message || '¿Está seguro de que desea realizar esta acción? Esta operación es irreversible.'}
            </p>
          </div>
          <div className="modal-footer bg-light">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={onConfirm}
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;