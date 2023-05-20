// controllers/authController.js

const authService = require('../services/authService');

const authController = {};

authController.login = async function(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authService.verifyCredentials(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

authController.refreshToken = async function(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const token = await authService.refreshToken(refreshToken);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = authController;

