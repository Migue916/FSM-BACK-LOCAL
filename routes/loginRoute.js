const express = require("express");
const login = require("../controllers/login_controller");
const router = express.Router();

//GET Method
router.post('/user', login.ingresar);
router.post('/create', login.user_create);

module.exports = router;




