// frontend/src/views/BookManagement.jsx
import React, { useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook, getBookById } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Obtener rol del usuario logueado
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Filtros de búsqueda (Funcionalidad 10)
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  // Estados para modales de creación / edición (Funcionalidades 9 y 12)
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Estado para modal de detalle por ID (Funcionalidad 11)
  const [detailBook, setDetailBook] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Estado para modal de eliminación (Funcionalidad 13)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // Formulario de Libro
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    editorial: '',
    anioPublicacion: '',
    categoria: 'Ingeniería',
    numeroPaginas: '',
    disponible: true,
    ubicacion: '',
    descripcion: ''
  });

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, categoryFilter, availabilityFilter]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.busqueda = searchTerm;
      if (categoryFilter) params.categoria = categoryFilter;
      if (availabilityFilter) params.disponible = availabilityFilter;

      const data = await getBooks(params);
      if (data.success) {
        setBooks(data.books);
      }
    } catch (err) {
      setError('Error al cargar el catálogo de libros.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleOpenCreateModal = () => {
    setEditMode(false);
    setSelectedBookId(null);
    setFormData({
      titulo: '',
      autor: '',
      isbn: '',
      editorial: '',
      anioPublicacion: new Date().getFullYear(),
      categoria: 'Ingeniería',
      numeroPaginas: '',
      disponible: true,
      ubicacion: '',
      descripcion: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (book) => {
    setEditMode(true);
    setSelectedBookId(book.id);
    setFormData({
      titulo: book.titulo,
      autor: book.autor,
      isbn: book.isbn,
      editorial: book.editorial || '',
      anioPublicacion: book.anioPublicacion || '',
      categoria: book.categoria,
      numeroPaginas: book.numeroPaginas || '',
      disponible: book.disponible,
      ubicacion: book.ubicacion || '',
      descripcion: book.descripcion || ''
    });
    setShowModal(true);
  };

  const handleViewDetail = async (id) => {
    try {
      const data = await getBookById(id);
      if (data.success) {
        setDetailBook(data.book);
        setShowDetailModal(true);
      }
    } catch (err) {
      setError('No se pudo cargar la información detallada del libro.');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editMode) {
        // Funcionalidad 12: Actualizar libro
        const data = await updateBook(selectedBookId, formData);
        if (data.success) {
          setSuccess('Información del libro actualizada correctamente.');
        }
      } else {
        // Funcionalidad 9: Registrar libro
        const data = await createBook(formData);
        if (data.success) {
          setSuccess('Libro registrado en el catálogo exitosamente.');
        }
      }
      setShowModal(false);
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar la solicitud.');
    }
  };

  const handleConfirmDelete = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const executeDelete = async () => {
    if (!bookToDelete) return;
    try {
      const data = await deleteBook(bookToDelete.id);
      if (data.success) {
        setSuccess(`El libro "${bookToDelete.titulo}" ha sido eliminado del catálogo.`);
        fetchBooks();
      }
    } catch (err) {
      setError('Error al intentar eliminar el libro.');
    } finally {
      setShowDeleteModal(false);
      setBookToDelete(null);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-1">📖 Módulo de Catálogo de Libros</h2>
          <p className="text-muted mb-0">Consulta y administración de material bibliográfico</p>
        </div>
        <button className="btn btn-success fw-bold" onClick={handleOpenCreateModal}>
          + Registrar Nuevo Libro
        </button>
      </div>

      {/* Alertas */}
      {error && <div className="alert alert-danger py-2">{error}</div>}
      {success && <div className="alert alert-success py-2">{success}</div>}

      {/* Barra de Búsqueda y Filtros (Funcionalidad 10) */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por título, autor o código ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Todas las Categorías</option>
                <option value="Ingeniería">Ingeniería</option>
                <option value="Programación">Programación</option>
                <option value="Literatura">Literatura</option>
                <option value="Ciencias">Ciencias</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <option value="">Todas las Disponibilidades</option>
                <option value="true">Disponible</option>
                <option value="false">No disponible</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Libros en Tarjetas / Tabla (Funcionalidad 10) */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>ISBN</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">Cargando catálogo...</td>
                  </tr>
                ) : books.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">No se encontraron libros registrados.</td>
                  </tr>
                ) : (
                  books.map((b) => (
                    <tr key={b.id}>
                      <td className="fw-bold">#{b.id}</td>
                      <td className="fw-semibold">{b.titulo}</td>
                      <td>{b.autor}</td>
                      <td><code>{b.isbn}</code></td>
                      <td><span className="badge bg-secondary">{b.categoria}</span></td>
                      <td>
                        <span className={`badge ${b.disponible ? 'bg-success' : 'bg-danger'}`}>
                          {b.disponible ? 'Disponible' : 'No disponible'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-info text-white me-1"
                          onClick={() => handleViewDetail(b.id)}
                          title="Ver detalle por ID"
                        >
                          👁️ Detalle
                        </button>
                        <button
                          className="btn btn-sm btn-warning text-white me-1"
                          onClick={() => handleOpenEditModal(b)}
                          title="Editar libro"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleConfirmDelete(b)}
                          title="Eliminar libro"
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

      {/* Modal Formulario Crear / Editar (Funcionalidades 9 y 12) */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">
                  {editMode ? 'Editar Libro' : 'Registrar Nuevo Libro'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmitForm}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">Título del Libro *</label>
                      <input
                        type="text"
                        name="titulo"
                        className="form-control"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">ISBN *</label>
                      <input
                        type="text"
                        name="isbn"
                        className="form-control"
                        placeholder="Ej. 978-0-13-235088-4"
                        value={formData.isbn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Autor(es) *</label>
                      <input
                        type="text"
                        name="autor"
                        className="form-control"
                        value={formData.autor}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Editorial</label>
                      <input
                        type="text"
                        name="editorial"
                        className="form-control"
                        value={formData.editorial}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Categoría *</label>
                      <select
                        name="categoria"
                        className="form-select"
                        value={formData.categoria}
                        onChange={handleInputChange}
                      >
                        <option value="Ingeniería">Ingeniería</option>
                        <option value="Programación">Programación</option>
                        <option value="Literatura">Literatura</option>
                        <option value="Ciencias">Ciencias</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Año de Publicación</label>
                      <input
                        type="number"
                        name="anioPublicacion"
                        className="form-control"
                        value={formData.anioPublicacion}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Nº Páginas</label>
                      <input
                        type="number"
                        name="numeroPaginas"
                        className="form-control"
                        value={formData.numeroPaginas}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Ubicación Física</label>
                      <input
                        type="text"
                        name="ubicacion"
                        className="form-control"
                        placeholder="Ej. Estante A-12"
                        value={formData.ubicacion}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 d-flex align-items-center mt-4">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="disponible"
                          id="disponibleSwitch"
                          checked={formData.disponible}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label fw-semibold" htmlFor="disponibleSwitch">
                          Disponible para Préstamo
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Resumen / Descripción</label>
                      <textarea
                        name="descripcion"
                        rows="3"
                        className="form-control"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success fw-bold">
                    {editMode ? 'Guardar Cambios' : 'Registrar Libro'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalle del Libro por ID (Funcionalidad 11) */}
      {showDetailModal && detailBook && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title fw-bold">📖 Detalle del Libro #{detailBook.id}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDetailModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Título:</strong> {detailBook.titulo}</p>
                <p><strong>Autor:</strong> {detailBook.autor}</p>
                <p><strong>ISBN:</strong> {detailBook.isbn}</p>
                <p><strong>Editorial:</strong> {detailBook.editorial || 'N/A'}</p>
                <p><strong>Año de Publicación:</strong> {detailBook.anioPublicacion || 'N/A'}</p>
                <p><strong>Categoría:</strong> {detailBook.categoria}</p>
                <p><strong>Número de Páginas:</strong> {detailBook.numeroPaginas || 'N/A'}</p>
                <p><strong>Ubicación Física:</strong> {detailBook.ubicacion || 'Sin asignar'}</p>
                <p>
                  <strong>Estado: </strong>
                  <span className={`badge ${detailBook.disponible ? 'bg-success' : 'bg-danger'}`}>
                    {detailBook.disponible ? 'Disponible' : 'No disponible'}
                  </span>
                </p>
                <p><strong>Descripción:</strong> {detailBook.descripcion || 'Sin descripción'}</p>
                <p><strong>Fecha de Registro:</strong> {new Date(detailBook.fechaRegistro).toLocaleString()}</p>
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

      {/* Modal de Confirmación de Eliminación (Funcionalidad 13) */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Eliminar Libro"
        message={`¿Está seguro de que desea eliminar el libro "${bookToDelete?.titulo}" del catálogo? Esta acción no se puede deshacer.`}
        onConfirm={executeDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default BookManagement;