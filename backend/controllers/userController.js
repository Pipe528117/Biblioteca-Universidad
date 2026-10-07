// backend/controllers/userController.js
let users = require('../models/userModel');

/**
 * MÓDULO 1: MOD_USUARIOS
 * Contiene la implementación completa de las 8 funcionalidades requeridas para la administración de usuarios.
 */

// FUNCIONALIDAD 1: Iniciar sesión
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Validación de campos requeridos
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Por favor ingrese correo electrónico y contraseña.' 
    });
  }

  // Búsqueda de usuario
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ 
      success: false, 
      message: 'Credenciales incorrectas. Verifique el correo o la contraseña.' 
    });
  }

  // Verificación de estado de la cuenta
  if (user.estado !== 'activo') {
    return res.status(403).json({ 
      success: false, 
      message: 'La cuenta se encuentra inactiva. Contacte al administrador.' 
    });
  }

  // Respuesta exitosa (sin exponer la contraseña)
  const userResponse = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
    estado: user.estado,
    fechaCreacion: user.fechaCreacion
  };

  return res.status(200).json({
    success: true,
    message: 'Inicio de sesión exitoso.',
    user: userResponse
  });
};

// FUNCIONALIDAD 2: Cerrar sesión
// (El cierre de sesión limpia la sesión en el cliente; el backend confirma el logout)
exports.logout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Sesión finalizada correctamente.'
  });
};

// FUNCIONALIDAD 3: Autorregistro público
exports.register = (req, res) => {
  const { nombre, email, password, confirmPassword } = req.body;

  // Validaciones de entradas obligatorias
  if (!nombre || !email || !password || !confirmPassword) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos los campos son obligatorios.' 
    });
  }

  // Validación de formato de email institucional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'El formato del correo electrónico no es válido.' 
    });
  }

  // Validación de longitud mínima de contraseña
  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'La contraseña debe tener mínimo 6 caracteres.' 
    });
  }

  // Validación de coincidencia de contraseñas
  if (password !== confirmPassword) {
    return res.status(400).json({ 
      success: false, 
      message: 'Las contraseñas no coinciden.' 
    });
  }

  // Verificación de unicidad de correo
  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(400).json({ 
      success: false, 
      message: 'El correo electrónico ya se encuentra registrado.' 
    });
  }

  // Generación de ID autoincremental
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  const newUser = {
    id: newId,
    nombre: nombre.trim(),
    email: email.toLowerCase().trim(),
    password: password,
    rol: 'usuario', // Rol predeterminado de usuario regular
    estado: 'activo',
    fechaCreacion: new Date().toISOString(),
    fechaModificacion: null
  };

  users.push(newUser);

  return res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente. Ahora puede iniciar sesión.',
    user: {
      id: newUser.id,
      nombre: newUser.nombre,
      email: newUser.email,
      rol: newUser.rol,
      estado: newUser.estado,
      fechaCreacion: newUser.fechaCreacion
    }
  });
};

// FUNCIONALIDAD 4: Registrar usuario por Administrador
exports.createUser = (req, res) => {
  const { nombre, email, password, rol, estado } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nombre, email y contraseña inicial son campos obligatorios.' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'El formato del correo electrónico no es válido.' 
    });
  }

  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(400).json({ 
      success: false, 
      message: 'El correo electrónico ya existe en el sistema.' 
    });
  }

  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  const newUser = {
    id: newId,
    nombre: nombre.trim(),
    email: email.toLowerCase().trim(),
    password: password,
    rol: rol || 'usuario',
    estado: estado || 'activo',
    fechaCreacion: new Date().toISOString(),
    fechaModificacion: null
  };

  users.push(newUser);

  return res.status(201).json({
    success: true,
    message: 'Usuario creado exitosamente por el administrador.',
    user: newUser
  });
};

// FUNCIONALIDAD 5: Consultar todos los usuarios
exports.getAllUsers = (req, res) => {
  const { busqueda, estado, rol } = req.query;

  let result = [...users];

  // Filtrado por barra de búsqueda (nombre o correo)
  if (busqueda) {
    const term = busqueda.toLowerCase();
    result = result.filter(u => 
      u.nombre.toLowerCase().includes(term) || 
      u.email.toLowerCase().includes(term)
    );
  }

  // Filtrado por estado
  if (estado) {
    result = result.filter(u => u.estado === estado);
  }

  // Filtrado por rol
  if (rol) {
    result = result.filter(u => u.rol === rol);
  }

  return res.status(200).json({
    success: true,
    total: result.length,
    users: result
  });
};

// FUNCIONALIDAD 6: Consultar usuario por ID
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      message: 'El ID proporcionado debe ser un valor numérico.' 
    });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ 
      success: false, 
      message: `No se encontró ningún usuario con el ID ${id}.` 
    });
  }

  return res.status(200).json({
    success: true,
    user: user
  });
};

// FUNCIONALIDAD 7: Actualizar usuario
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      message: 'El ID proporcionado debe ser un valor numérico.' 
    });
  }

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      message: `No se encontró ningún usuario con el ID ${id}.` 
    });
  }

  const { nombre, email, password, rol, estado } = req.body;

  // Si intenta cambiar el correo, validar que no esté en uso por otro usuario
  if (email && email.toLowerCase() !== users[userIndex].email.toLowerCase()) {
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== id);
    if (emailExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'El nuevo correo electrónico ya está en uso por otro usuario.' 
      });
    }
  }

  // Actualización de campos opcionales / condicionales
  users[userIndex] = {
    ...users[userIndex],
    nombre: nombre ? nombre.trim() : users[userIndex].nombre,
    email: email ? email.toLowerCase().trim() : users[userIndex].email,
    password: password || users[userIndex].password,
    rol: rol || users[userIndex].rol,
    estado: estado || users[userIndex].estado,
    fechaModificacion: new Date().toISOString()
  };

  return res.status(200).json({
    success: true,
    message: 'Usuario actualizado correctamente.',
    user: users[userIndex]
  });
};

// FUNCIONALIDAD 8: Eliminar usuario
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      message: 'El ID proporcionado debe ser un valor numérico.' 
    });
  }

  const userExists = users.some(u => u.id === id);

  if (!userExists) {
    return res.status(404).json({ 
      success: false, 
      message: `No se encontró ningún usuario con el ID ${id} para eliminar.` 
    });
  }

  // Eliminación del usuario del listado
  users = users.filter(u => u.id !== id);

  return res.status(200).json({
    success: true,
    message: `El usuario con ID ${id} ha sido eliminado permanentemente.`
  });
};