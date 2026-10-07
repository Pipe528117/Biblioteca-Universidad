// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==========================================
// SERVICIOS MÓDULO 1: MOD_USUARIOS (8 Funcionalidades)
// ==========================================

// Funcionalidad 1: Iniciar sesión
export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

// Funcionalidad 2: Cerrar sesión
export const logoutUser = async () => {
  const response = await api.post('/users/logout');
  return response.data;
};

// Funcionalidad 3: Autorregistro público
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

// Funcionalidad 5: Consultar todos los usuarios
export const getUsers = async (params = {}) => {
  const response = await api.get('/users', { params });
  return response.data;
};

// Funcionalidad 6: Consultar usuario por ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Funcionalidad 4: Registrar usuario (Admin)
export const createUserByAdmin = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Funcionalidad 7: Actualizar usuario
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Funcionalidad 8: Eliminar usuario
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};


// ==========================================
// SERVICIOS MÓDULO 2: MOD_LIBROS (5 Funcionalidades)
// ==========================================

// Funcionalidad 10: Consultar todos los libros
export const getBooks = async (params = {}) => {
  const response = await api.get('/books', { params });
  return response.data;
};

// Funcionalidad 11: Consultar libro por ID
export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Funcionalidad 9: Registrar libro
export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

// Funcionalidad 12: Actualizar libro
export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

// Funcionalidad 13: Eliminar libro
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export default api;