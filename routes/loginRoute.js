const express = require("express");
const login = require("../controllers/login_controller");
const router = express.Router();


/**
 * @swagger
 * /login/user:
 *   post:
 *     summary: Ingresar un usuario
 *     description: Autenticación de usuario y generación de token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: usuario@example.com
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: miContraseña123
 *     responses:
 *       200:
 *         description: Autenticación exitosa y token generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                   example: 1
 *                 Administrador:
 *                   type: boolean
 *                   description: Cargo del usuario
 *                   example: true
 *                 Modulo:
 *                   type: string
 *                   description: Módulo asignado al usuario
 *                   example: ventas
 *                 token:
 *                   type: string
 *                   description: Token de acceso
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         description: Error en la autenticación (contraseña incorrecta, correo incorrecto o campos faltantes)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: Contraseña incorrecta
 */
router.post('/user', login.ingresar);

/**
 * @swagger
 * /login/create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - id_tipo_doc
 *               - p_nombre
 *               - s_nombre
 *               - p_apellido
 *               - s_apellido
 *               - id_profesion
 *               - tarjeta_profesional
 *               - fecha_nacimiento
 *               - id_cargo
 *               - activo
 *               - id_genero
 *               - pertenencia_de_modulo
 *               - email
 *               - contrasena
 *               - cargo
 *             properties:
 *               id:
 *                 type: integer
 *               id_tipo_doc:
 *                 type: integer
 *               p_nombre:
 *                 type: string
 *               s_nombre:
 *                 type: string
 *               p_apellido:
 *                 type: string
 *               s_apellido:
 *                 type: string
 *               id_profesion:
 *                 type: integer
 *               tarjeta_profesional:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *               id_cargo:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *               id_genero:
 *                 type: integer
 *               pertenencia_de_modulo:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               contrasena:
 *                 type: string
 *               cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Faltan campos por llenar
 *       500:
 *         description: Error del servidor
 */
router.post('/create', login.user_create);

/**
 * @swagger
 * /login/newPassword:
 *   put:
 *     tags:
 *       - Login
 *     summary: Cambiar contraseña de un empleado
 *     description: Permite cambiar la contraseña de un empleado existente.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasena
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del empleado.
 *               contrasena:
 *                 type: string
 *                 description: La nueva contraseña del empleado.
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Error al cambiar la contraseña (campos faltantes o error interno).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.put('/newPassword', login.new_Password);



module.exports = router;




