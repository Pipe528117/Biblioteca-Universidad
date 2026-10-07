// backend/controllers/bookController.js
let books = require('../models/bookModel');

/**
 * MÓDULO 2: MOD_LIBROS
 * Contiene la implementación completa de las 5 funcionalidades requeridas para el catálogo de libros.
 */

// FUNCIONALIDAD 9: Registrar libro
exports.createBook = (req, res) => {
  const { 
    titulo, 
    autor, 
    isbn, 
    editorial, 
    anioPublicacion, 
    categoria, 
    numeroPaginas, 
    disponible, 
    ubicacion, 
    descripcion 
  } = req.body;

  // Validaciones de campos obligatorios
  if (!titulo || !autor || !isbn || !categoria) {
    return res.status(400).json({
      success: false,
      message: 'Los campos Título, Autor, ISBN y Categoría son obligatorios.'
    });
  }

  // Validación de longitud mínima
  if (titulo.trim().length < 3 || autor.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: 'El título y el autor deben tener al menos 3 caracteres.'
    });
  }

  // Validación de unicidad de ISBN
  const isbnExists = books.some(b => b.isbn.trim() === isbn.trim());
  if (isbnExists) {
    return res.status(400).json({
      success: false,
      message: 'El código ISBN ingresado ya se encuentra registrado en el catálogo.'
    });
  }

  // Validación de rango para Año de Publicación
  const currentYear = new Date().getFullYear();
  if (anioPublicacion) {
    const yearNum = parseInt(anioPublicacion);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
      return res.status(400).json({
        success: false,
        message: `El año de publicación debe ser un valor numérico entre 1900 y ${currentYear}.`
      });
    }
  }

  // Generación de ID autoincremental
  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

  const newBook = {
    id: newId,
    titulo: titulo.trim(),
    autor: autor.trim(),
    isbn: isbn.trim(),
    editorial: editorial ? editorial.trim() : '',
    anioPublicacion: anioPublicacion ? parseInt(anioPublicacion) : null,
    categoria: categoria.trim(),
    numeroPaginas: numeroPaginas ? parseInt(numeroPaginas) : null,
    disponible: disponible !== undefined ? Boolean(disponible) : true,
    ubicacion: ubicacion ? ubicacion.trim() : '',
    descripcion: descripcion ? descripcion.trim() : '',
    fechaRegistro: new Date().toISOString(),
    fechaModificacion: null
  };

  books.push(newBook);

  return res.status(201).json({
    success: true,
    message: 'Libro registrado exitosamente en el catálogo.',
    book: newBook
  });
};

// FUNCIONALIDAD 10: Consultar todos los libros (con filtros y búsqueda)
exports.getAllBooks = (req, res) => {
  const { busqueda, categoria, disponible } = req.query;

  let result = [...books];

  // Filtro por barra de búsqueda (Título, Autor o ISBN)
  if (busqueda) {
    const term = busqueda.toLowerCase().trim();
    result = result.filter(b => 
      b.titulo.toLowerCase().includes(term) || 
      b.autor.toLowerCase().includes(term) ||
      b.isbn.toLowerCase().includes(term)
    );
  }

  // Filtro por categoría
  if (categoria) {
    result = result.filter(b => b.categoria.toLowerCase() === categoria.toLowerCase());
  }

  // Filtro por disponibilidad
  if (disponible !== undefined) {
    const isAvailable = disponible === 'true';
    result = result.filter(b => b.disponible === isAvailable);
  }

  return res.status(200).json({
    success: true,
    total: result.length,
    books: result
  });
};

// FUNCIONALIDAD 11: Consultar libro por ID
exports.getBookById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'El ID proporcionado debe ser un número entero.'
    });
  }

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: `No se encontró ningún libro con el ID ${id}.`
    });
  }

  return res.status(200).json({
    success: true,
    book: book
  });
};

// FUNCIONALIDAD 12: Actualizar libro
exports.updateBook = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'El ID proporcionado debe ser un valor numérico.'
    });
  }

  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `No se encontró el libro con ID ${id} para actualizar.`
    });
  }

  const { 
    titulo, 
    autor, 
    isbn, 
    editorial, 
    anioPublicacion, 
    categoria, 
    numeroPaginas, 
    disponible, 
    ubicacion, 
    descripcion 
  } = req.body;

  // Verificar si cambia el ISBN que no pertenezca a otro libro
  if (isbn && isbn.trim() !== books[bookIndex].isbn) {
    const isbnExists = books.some(b => b.isbn.trim() === isbn.trim() && b.id !== id);
    if (isbnExists) {
      return res.status(400).json({
        success: false,
        message: 'El nuevo código ISBN ingresado ya está asignado a otro libro.'
      });
    }
  }

  // Actualización de campos mantenidos o modificados
  books[bookIndex] = {
    ...books[bookIndex],
    titulo: titulo ? titulo.trim() : books[bookIndex].titulo,
    autor: autor ? autor.trim() : books[bookIndex].autor,
    isbn: isbn ? isbn.trim() : books[bookIndex].isbn,
    editorial: editorial !== undefined ? editorial.trim() : books[bookIndex].editorial,
    anioPublicacion: anioPublicacion !== undefined ? parseInt(anioPublicacion) : books[bookIndex].anioPublicacion,
    categoria: categoria ? categoria.trim() : books[bookIndex].categoria,
    numeroPaginas: numeroPaginas !== undefined ? parseInt(numeroPaginas) : books[bookIndex].numeroPaginas,
    disponible: disponible !== undefined ? Boolean(disponible) : books[bookIndex].disponible,
    ubicacion: ubicacion !== undefined ? ubicacion.trim() : books[bookIndex].ubicacion,
    descripcion: descripcion !== undefined ? descripcion.trim() : books[bookIndex].descripcion,
    fechaModificacion: new Date().toISOString()
  };

  return res.status(200).json({
    success: true,
    message: 'Información del libro actualizada correctamente.',
    book: books[bookIndex]
  });
};

// FUNCIONALIDAD 13: Eliminar libro
exports.deleteBook = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'El ID proporcionado debe ser un valor numérico.'
    });
  }

  const bookExists = books.some(b => b.id === id);

  if (!bookExists) {
    return res.status(404).json({
      success: false,
      message: `No se encontró ningún libro con el ID ${id} para eliminar.`
    });
  }

  books = books.filter(b => b.id !== id);

  return res.status(200).json({
    success: true,
    message: `El libro con ID ${id} ha sido eliminado del catálogo.`
  });
};