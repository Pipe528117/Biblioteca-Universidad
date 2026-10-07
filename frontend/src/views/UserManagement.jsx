// frontend/src/views/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { getUsers, createUserByAdmin, updateUser, deleteUser, getUserById } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filtros de búsqueda (Funcionalidad 5)
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Estados para modales de edición/creación
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Estado para el modal de detalle por ID (Funcionalidad 6)
  const [detailUser, setDetailUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Estado para modal de eliminación (Funcionalidad 8)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Formulario de Usuario (Funcionalidades 4 y 7)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario',
    estado: 'activo'
  });

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.busqueda = searchTerm;
      if (roleFilter) params.rol = roleFilter;
      if (statusFilter) params.estado = statusFilter;

      const data = await getUsers(params);
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      setError('Error al cargar la lista de usuarios.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenCreateModal = () => {
    setEditMode(false);
    setSelectedUserId(null);
    setFormData({
      nombre: '',
      email: '',
      password: '',
      rol: 'usuario',
      estado: 'activo'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (user) => {
    setEditMode(true);
    setSelectedUserId(user.id);
    setFormData({
      nombre: user.nombre,
      email: user.email,
      password: '', // Dejar vacío si no se desea modificar
      rol: user.rol,
      estado: user.estado
    });
    setShowModal(true);
  };

  const handleViewDetail = async (id) => {
    try {
      const data = await getUserById(id);
      if (data.success) {
        setDetailUser(data.user);
        setShowDetailModal(true);
      }
    } catch (err) {
      setError('No se pudo obtener el detalle del usuario.');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editMode) {
        // Funcionalidad 7: Actualizar
        const data = await updateUser(selectedUserId, formData);
        if (data.success) {
          setSuccess('Usuario actualizado correctamente.');
        }
      } else {
        // Funcionalidad 4: Crear por Admin
        const data = await createUserByAdmin(formData);
        if (data.success) {
          setSuccess('Usuario registrado exitosamente.');
        }
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar la solicitud.');
    }
  };

  const handleConfirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const executeDelete = async () => {
    if (!userToDelete) return;
    try {
      const data = await deleteUser(userToDelete.id);
      if (data.success) {
        setSuccess(`Usuario ${userToDelete.nombre} eliminado exitosamente.`);
        fetchUsers();
      }
    } catch (err) {
      setError('Error al intentar eliminar el usuario.');
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-1">👥 Módulo de Gestión de Usuarios</h2>
          <p className="text-muted mb-0">Administración general de usuarios y permisos</p>
        </div>
        <button className="btn btn-primary fw-bold" onClick={handleOpenCreateModal}>
          + Registrar Nuevo Usuario
        </button>
      </div>

      {/* Alertas */}
      {error && <div className="alert alert-danger py-2">{error}</div>}
      {success && <div className="alert alert-success py-2">{success}</div>}

      {/* Barra de Filtros y Búsqueda (Funcionalidad 5) */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o correo electrónico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">Todos los Roles</option>
                <option value="admin">Administrador</option>
                <option value="usuario">Usuario Regular</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos los Estados</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Usuarios (Funcionalidad 5) */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">Cargando usuarios...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No se encontraron usuarios registrados.</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td className="fw-bold">#{u.id}</td>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`badge ${u.rol === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                          {u.rol}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${u.estado === 'activo' ? 'bg-success' : 'bg-warning'}`}>
                          {u.estado}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-info text-white me-1"
                          onClick={() => handleViewDetail(u.id)}
                          title="Ver detalle por ID"
                        >
                          👁️ Detalle
                        </button>
                        <button
                          className="btn btn-sm btn-warning text-white me-1"
                          onClick={() => handleOpenEditModal(u)}
                          title="Editar usuario"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleConfirmDelete(u)}
                          title="Eliminar usuario"
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Formulario Crear / Editar (Funcionalidades 4 y 7) */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  {editMode ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmitForm}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nombre Completo</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Correo Electrónico</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Contraseña {editMode && '(Dejar en blanco para mantener la actual)'}
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!editMode}
                    />
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Rol</label>
                      <select
                        name="rol"
                        className="form-select"
                        value={formData.rol}
                        onChange={handleInputChange}
                      >
                        <option value="usuario">Usuario Regular</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Estado</label>
                      <select
                        name="estado"
                        className="form-select"
                        value={formData.estado}
                        onChange={handleInputChange}
                      >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary fw-bold">
                    {editMode ? 'Guardar Cambios' : 'Registrar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalle de Usuario por ID (Funcionalidad 6) */}
      {showDetailModal && detailUser && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title fw-bold">🔍 Detalle del Usuario #{detailUser.id}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDetailModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {detailUser.id}</p>
                <p><strong>Nombre:</strong> {detailUser.nombre}</p>
                <p><strong>Correo:</strong> {detailUser.email}</p>
                <p><strong>Rol:</strong> {detailUser.rol}</p>
                <p><strong>Estado:</strong> {detailUser.estado}</p>
                <p><strong>Fecha de Creación:</strong> {new Date(detailUser.fechaCreacion).toLocaleString()}</p>
                <p><strong>Última Modificación:</strong> {detailUser.fechaModificacion ? new Date(detailUser.fechaModificacion).toLocaleString() : 'Sin modificaciones'}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación (Funcionalidad 8) */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Eliminar Usuario"
        message={`¿Está seguro de que desea eliminar al usuario "${userToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirm={executeDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default UserManagement;