
// services/authService.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const tokenUtils = require('../utils/token');

const authService = {};

authService.verifyCredentials = async function(email, password) {
  // Buscamos el usuario por su correo electrónico
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('El usuario no existe');
  }

  // Comparamos la contraseña ingresada con la almacenada en la base de datos
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('La contraseña es incorrecta');
  }

  // Si las credenciales son válidas, generamos un token y lo devolvemos
  const token = tokenUtils.generateToken(user._id);
  return token;
};

authService.refreshToken = async function(refreshToken) {
  // Validamos el token de refresco
  const decoded = tokenUtils.verifyRefreshToken(refreshToken);
  const user = await userRepository.findById(decoded.userId);
  if (!user) {
    throw new Error('El usuario no existe');
  }

  // Generamos un nuevo token de acceso y lo devolvemos
  const token = tokenUtils.generateToken(user._id);
  return token;
};

module.exports = authService;
