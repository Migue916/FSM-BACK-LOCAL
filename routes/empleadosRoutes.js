const express = require("express");
const getEmpleadoController = require("../controllers/empleado_controller");
const router = express.Router();


/**
 * @swagger
 * /empleados/estadisticas:
 *   get:
 *     tags:
 *       - Empleado Controller
 *     summary: Obtiene estadísticas de empleados
 *     description: Obtiene estadísticas de empleados, como el número de empleados actuales y el número de beneficiarios egresados.
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: successful
 *                 empleados_actuales:
 *                   type: integer
 *                   example: 10
 *                 beneficiarios_egresados:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Error al obtener las estadísticas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: error message
 */
router.get('/estadisticas', getEmpleadoController.getStatisticsEmpleados);

/**
 * @swagger
 * /empleados/estadisticas/genero:
 *   get:
 *     tags:
 *       - Empleados
 *     summary: Obtiene estadísticas de empleados por género
 *     description: Retorna un objeto con estadísticas de empleados agrupados por género
 *     responses:
 *       200:
 *         description: Estadísticas de empleados por género obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación
 *                 message:
 *                   type: string
 *                   description: Mensaje de la operación
 *                 empleados_genero:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       genero:
 *                         type: string
 *                         description: Género del empleado
 *                       cantidad:
 *                         type: integer
 *                         description: Cantidad de empleados con ese género
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get('/estadisticas/genero', getEmpleadoController.getStatisticsEmpleadosGenero);

/**
 * @swagger
 * /empleados/estadisticas/genero:
 *   get:
 *     summary: Obtener estadísticas de empleados por género
 *     description: Recupera las estadísticas de empleados en función de su género.
 *     tags:
 *       - Empleados
 *     responses:
 *       200:
 *         description: Estadísticas de empleados por género obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "successful"
 *                 empleados_modulo:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error al obtener las estadísticas de empleados por género
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "error"
 */
router.get('/estadisticas/modulo', getEmpleadoController.getStatisticsEmpleadosModulo);

/**
 * @swagger
 * /empleados/lastTen:
 *   get:
 *     summary: Obtiene los últimos 10 empleados
 *     description: Retorna una lista con los últimos 10 empleados registrados en el sistema.
 *     responses:
 *       200:
 *         description: La lista de empleados ha sido obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje relacionado con la operación
 *                   example: "successful"
 *                 getEmpleados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del empleado
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nombre del empleado
 *                         example: "John Doe"
 *       400:
 *         description: Ha ocurrido un error al obtener la lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al obtener la lista de empleados"
 */
router.get('/lastTen', getEmpleadoController.getEmpleadosLastTen);

/**
 * @swagger
 * /empleados/ten/:
 *   get:
 *     summary: Obtiene empleados por nombre
 *     description: Obtiene una lista filtrada de empleados cuyo nombre coincide con el parámetro de consulta proporcionado.
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del empleado que se desea buscar
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación
 *                 message:
 *                   type: string
 *                   description: Mensaje de la operación
 *                 empleados:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Lista de empleados que coinciden con el nombre proporcionado
 *       400:
 *         description: Error en la operación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get('/ten/', getEmpleadoController.getEmpleadosPorNombre);

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: API para obtener información de empleados
 * /empleados/saludo/:
 *   get:
 *     summary: Obtener el nombre completo y cargo del empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Información del empleado obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Apellido:
 *                   type: string
 *                 Cargo:
 *                   type: string
 *                 Modulo:
 *                   type: string
 *       400:
 *         description: Error en la solicitud
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
router.get('/saludo/', getEmpleadoController.getNombre);


/**
 * @swagger
 * /empleados/listAll:
 *   get:
 *     summary: Obtiene una lista de empleados
 *     description: Devuelve una lista de empleados con información detallada
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de la página a mostrar
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 paginas:
 *                   type: integer
 *                 empleados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Nombre:
 *                         type: string
 *                       Identificacion:
 *                         type: integer
 *                       Edad:
 *                         type: integer
 *                       Consultas_realizadas:
 *                         type: integer
 *                       Cargo:
 *                         type: string
 *                       Modulo:
 *                         type: string
 */
router.get('/listAll/', getEmpleadoController.getEmpleados);

/**
 * @swagger
 * /empleados/filtarCargo:
 *   get:
 *     summary: Obtiene una lista de empleados por cargo
 *     description: Obtiene una lista de empleados filtrada por cargo y/o módulo.
 *     parameters:
 *       - in: query
 *         name: Cargo
 *         schema:
 *           type: string
 *         description: Cargo del empleado
 *       - in: query
 *         name: Modulo
 *         schema:
 *           type: string
 *         description: Módulo al que pertenece el empleado
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Nombre:
 *                     type: string
 *                     description: Nombre completo del empleado
 *                   Identificacion:
 *                     type: integer
 *                     description: Identificación del empleado
 *                   Cargo:
 *                     type: string
 *                     description: Cargo del empleado
 *                   Modulo:
 *                     type: string
 *                     description: Módulo al que pertenece el empleado
 *       400:
 *         description: Error en la solicitud
 */
router.get('/filtarCargo/', getEmpleadoController.getEmpleadosPorCargo);

/**
 * @swagger
 * /empleados/desplegables:
 *   get:
 *     summary: Obtiene información desplegable para empleados
 *     description: Obtiene información desplegable para empleados, como cargos y módulos.
 *     responses:
 *       200:
 *         description: Información desplegable obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito o error
 *                 getEmpleadosCargos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Información de cargos de empleados
 *                 getEmpleadosModulos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Información de módulos de empleados
 */
router.get('/desplegables', getEmpleadoController.getDesplegables);

/**
 * @swagger
 * /empleados/perfil:
 *   get:
 *     summary: Obtener el perfil de un empleado
 *     description: Retorna el perfil de un empleado basado en su Id.
 *     parameters:
 *       - in: query
 *         name: Id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificación del empleado
 *     responses:
 *       200:
 *         description: Perfil del empleado obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Nombre:
 *                   type: string
 *                 Apellido:
 *                   type: string
 *                 Identificacion:
 *                   type: integer
 *                 Fecha_nacimiento:
 *                   type: string
 *                 Edad:
 *                   type: integer
 *                 Fecha_ingreso:
 *                   type: string
 *                 Num_consultas:
 *                   type: string
 *                 Cargo:
 *                   type: string
 *                 Modulo:
 *                   type: string
 *       400:
 *         description: Error al obtener el perfil del empleado
 */
router.get('/perfil/', getEmpleadoController.getPerfil);


module.exports = router;
