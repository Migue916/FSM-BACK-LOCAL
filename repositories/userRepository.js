
// repositories/userRepository.js

const User = require('../models/user');

const userRepository = {};

userRepository.findByEmail = async function(email) {
  return User.findOne({ email });
};

userRepository.findById = async function(id) {
  return User.findById(id);
};

module.exports = userRepository;
