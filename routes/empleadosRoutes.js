const express = require("express");
const getEmpleadoController = require("../controllers/empleado_controller");
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
 * empleados/listAll/:
 *   get:
 *     summary: Obtiene una lista de empleados
 *     description: Obtiene una lista de empleados con información detallada
 *     parameters:
 *       - in: query
 *         name: Identificador
 *         schema:
 *           type: string
 *         description: Identificación del empleado
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
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
 *                 Total:
 *                   type: integer
 *                   example: 10
 *                 empleados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Nombre:
 *                         type: string
 *                       Identificacion:
 *                         type: string
 *                       Genero:
 *                         type: string
 *                       Cargo:
 *                         type: string
 *                       Modulo:
 *                         type: string
 *       400:
 *         description: Error al obtener la lista de empleados
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
 *                   example: error_message
 */

router.get('/listAll/', getEmpleadoController.getEmpleados);

/**
 * @swagger
 * /empleados/filtrarCargo-Modulo:
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
router.get('/filtrarCargo-Modulo/', getEmpleadoController.getEmpleadosPorCargo);

/**
 * @swagger
 * /empleados/desplegables:
 *   get:
 *     summary: Obtener desplegables de empleados.
 *     description: Obtiene los desplegables relacionados con los empleados, como los cargos, módulos y géneros.
 *     responses:
 *       200:
 *         description: Respuesta exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica el estado de la solicitud.
 *                 message:
 *                   type: string
 *                   description: Mensaje de estado.
 *                 getEmpleadosCargos:
 *                   type: array
 *                   description: Array de cargos de empleados.
 *                   items:
 *                     type: string
 *                 getEmpleadosModulos:
 *                   type: array
 *                   description: Array de módulos de empleados.
 *                   items:
 *                     type: string
 *                 getEmpleadosGeneros:
 *                   type: array
 *                   description: Array de géneros de empleados.
 *                   items:
 *                     type: string
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica el estado de la solicitud.
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.get('/desplegables', getEmpleadoController.getDesplegables);

/**
 * @swagger
 * /empleados/perfil:
 *   get:
 *     summary: Obtener el perfil de un empleado
 *     description: Retorna el perfil de un empleado dado su identificador (Id).
 *     parameters:
 *       - in: query
 *         name: Id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificador único del empleado
 *     responses:
 *       200:
 *         description: Perfil del empleado obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 getPerfil:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Nombre:
 *                         type: string
 *                       Apellido:
 *                         type: string
 *                       Identificacion:
 *                         type: integer
 *                       Genero:
 *                         type: string
 *                       Fecha_nacimiento:
 *                         type: string
 *                         format: date
 *                       Edad:
 *                         type: integer
 *                       Fecha_ingreso:
 *                         type: string
 *                         format: date
 *                       Num_consultas:
 *                         type: integer
 *                       Cargo:
 *                         type: string
 *                       Modulo:
 *                         type: string
 *                       Admin:
 *                         type: boolean
 *       400:
 *         description: Error al obtener el perfil del empleado
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
router.get('/perfil/', getEmpleadoController.getPerfil);

/**
 * @swagger
 * /empleados/egresar/:
 *   put:
 *     summary: Actualiza el estado de un empleado a egresado.
 *     description: Actualiza el estado de un empleado a egresado y registra el egreso en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_persona:
 *                 type: string
 *                 description: El ID de la persona asociada al empleado.
 *               observacion:
 *                 type: string
 *                 description: Observaciones adicionales sobre el egreso.
 *     responses:
 *       200:
 *         description: Respuesta exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la solicitud.
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo de la solicitud.
 *                 postEgreso:
 *                   type: object
 *                   description: Resultado del registro de egreso.
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la solicitud.
 *                 message:
 *                   type: string
 *                   description: Mensaje de error descriptivo.
 */

router.put('/egresar/', getEmpleadoController.putEgresado);

/**
 * @swagger
 * /empleados/perfil-foto/:
 *   get:
 *     summary: Obtener foto de perfil de un empleado.
 *     description: Endpoint para obtener la foto de perfil de un empleado.
 *     parameters:
 *       - in: query
 *         name: Id
 *         description: ID del empleado.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. La foto se ha obtenido correctamente.
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Error. No se pudo obtener la foto de perfil.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get('/perfil-foto/', getEmpleadoController.getFoto);

/**
 * @swagger
 * /empleados/perfil-foto/:
 *   post:
 *     summary: Sube una foto de perfil de empleado.
 *     description: Sube una foto de perfil de empleado y la guarda en el servidor.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Archivo de imagen a subir (formato JPEG).
 *     responses:
 *       200:
 *         description: Foto de perfil subida exitosamente.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               description: Estado de la respuesta.
 *             message:
 *               type: string
 *               description: Mensaje de la respuesta.
 *             postFoto:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_persona:
 *                     type: string
 *                     description: ID de la persona.
 *                   ruta:
 *                     type: string
 *                     format: uri
 *                     description: URL de la foto de perfil.
 *       400:
 *         description: Error al subir la foto de perfil.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               description: Estado de la respuesta.
 *             message:
 *               type: string
 *               description: Mensaje de error.
 *       500:
 *         description: Error del servidor.
 */

router.post('/perfil-foto/',upload.single('file'), getEmpleadoController.postFoto);



/**
 * @swagger
 * /empleados/list/modulo:
 *   get:
 *     summary: Obtiene la lista de módulos de empleados.
 *     description: Devuelve una lista de módulos de empleados.
 *     responses:
 *       200:
 *         description: Respuesta exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la solicitud.
 *                 message:
 *                   type: string
 *                   description: Mensaje de la solicitud.
 *                 getModulosList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: ID del módulo.
 *                       modulo:
 *                         type: string
 *                         description: Nombre del módulo.
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la solicitud.
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */

router.get('/list/modulo', getEmpleadoController.getModulosList);

/**
 * @swagger
 * /empleados/list/cargo:
 *   get:
 *     summary: Obtener la lista de cargos de empleados.
 *     description: Devuelve una lista de los cargos de empleados disponibles.
 *     responses:
 *       200:
 *         description: Respuesta exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica el estado de la solicitud.
 *                 message:
 *                   type: string
 *                   description: Mensaje de la respuesta.
 *                 getCargosList:
 *                   type: array
 *                   description: Lista de cargos de empleados.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID del cargo.
 *                       cargo:
 *                         type: string
 *                         description: Nombre del cargo.
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica el estado de la solicitud.
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.get('/list/cargo', getEmpleadoController.getCargosList);

/**
 * @swagger
 * /empleados/list/profesion:
 *   get:
 *     summary: Obtener lista de profesiones de empleados
 *     description: Obtiene la lista de profesiones de los empleados.
 *     tags:
 *       - Empleados
 *     responses:
 *       200:
 *         description: Respuesta exitosa
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
 *                 getProfesionList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       profesion:
 *                         type: string
 *                         example: Médico
 *       400:
 *         description: Error en la solicitud
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
 *                   example: Error al obtener la lista de profesiones
 */

router.get('/list/profesion', getEmpleadoController.getProfesionList);

/**
 * @swagger
 * /empleados/edit/modulo:
 *   put:
 *     summary: Actualiza el módulo de un empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_empleado:
 *                 type: string
 *                 description: ID del empleado
 *               id_new_modulo:
 *                 type: string
 *                 description: ID del nuevo módulo
 *     responses:
 *       200:
 *         description: Éxito. El módulo del empleado ha sido actualizado correctamente.
 *       400:
 *         description: Error. No se pudo actualizar el módulo del empleado.
 */
router.put('/edit/modulo', getEmpleadoController.putEmpleadoModulo);

/**
 * @swagger
 * /empleados/edit/cargo:
 *   put:
 *     summary: Actualiza el cargo de un empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_empleado:
 *                 type: string
 *               id_new_cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actualización exitosa
 *       400:
 *         description: Error en la solicitud
 */
router.put('/edit/cargo', getEmpleadoController.putEmpleadoCargo);


/**
 * @swagger
 * /empleados/edit/info:
 *   put:
 *     summary: Actualiza la información de un empleado
 *     description: Permite editar la información de un empleado.
 *     parameters:
 *       - name: id_empleado
 *         in: body
 *         description: ID del empleado
 *         required: true
 *         schema:
 *           type: integer
 *       - name: p_nombre
 *         in: body
 *         description: Primer nombre del empleado
 *         required: true
 *         schema:
 *           type: string
 *       - name: s_nombre
 *         in: body
 *         description: Segundo nombre del empleado
 *         required: true
 *         schema:
 *           type: string
 *       - name: p_apellido
 *         in: body
 *         description: Primer apellido del empleado
 *         required: true
 *         schema:
 *           type: string
 *       - name: s_apellido
 *         in: body
 *         description: Segundo apellido del empleado
 *         required: true
 *         schema:
 *           type: string
 *       - name: id_tipo_doc
 *         in: body
 *         description: ID del tipo de documento del empleado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Éxito en la actualización de la información del empleado
 *       400:
 *         description: Error en la solicitud
 */
router.put('/edit/info', getEmpleadoController.putInfo);

/**
 * @swagger
 * /empleados/list/consultas:
 *   get:
 *     summary: Obtiene la lista de consultas de empleados.
 *     description: Endpoint para obtener la lista de consultas de empleados.
 *     parameters:
 *       - in: query
 *         name: Id
 *         schema:
 *           type: string
 *         description: El ID de la consulta.
 *       - in: query
 *         name: isFormat
 *         schema:
 *           type: boolean
 *         description: Indica si el resultado debe ser formateado.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 getConsulta:
 *                   type: object
 *                   properties:
 *                     // Propiedades de la respuesta de getConsulta
 *       '400':
 *         description: Error en la solicitud.
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
router.get('/list/consultas', getEmpleadoController.getConsultas);

/**
 * @swagger
 * /empleados/download/consulta:
 *   get:
 *     summary: Descargar consulta de empleado
 *     description: Descarga un archivo de consulta de empleado en formato especificado.
 *     parameters:
 *       - in: query
 *         name: hex
 *         required: true
 *         schema:
 *           type: string
 *         description: Valor hexadecimal para la consulta de empleado.
 *       - in: query
 *         name: isFormat
 *         required: true
 *         schema:
 *           type: boolean
 *         description: Indica si el formato del archivo debe ser procesado.
 *     responses:
 *       200:
 *         description: Archivo de consulta descargado exitosamente.
 *       400:
 *         description: Error al procesar la solicitud.
 */
router.post('/download/consulta', getEmpleadoController.getConsultaBuffer);

/**
 * @swagger
 * /empleados/consultas/ultimo-mes:
 *   get:
 *     summary: Obtener beneficiarios del último mes
 *     description: Obtén la lista de beneficiarios del último mes para un empleado.
 *     parameters:
 *       - in: query
 *         name: id_empleado
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 getBeneficiariosUltimoMes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       hex:
 *                         type: string
 *                       modulo:
 *                         type: string
 *                       id_beneficiario:
 *                         type: integer
 *                       beneficiario:
 *                         type: string
 *                       edad:
 *                         type: integer
 *                       fecha:
 *                         type: string
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       isFormat:
 *                         type: boolean
 *                       adjuntos:
 *                         type: array
 *                         items:
 *                           type: object
 *     '400':
 *       description: Error en la solicitud
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *               message:
 *                 type: string
 */
router.get('/consultas/ultimo-mes', getEmpleadoController.getBeneficiariosUltimoMes);


router.put('/edit/profesion', getEmpleadoController.putEmpleadoProfesion);


router.put('/edit/tipoAdmin', getEmpleadoController.putEmpleadoTipoAdmin);  


router.post('/new/modulo', getEmpleadoController.postModulo);

router.post('/new/cargo', getEmpleadoController.postCargo);

router.post('/new/profesion', getEmpleadoController.postProfesion);



router.put('/edit/general/modulo', getEmpleadoController.putGeneralModulo);

router.put('/edit/general/cargo', getEmpleadoController.putGeneralCargo);

router.put('/edit/general/profesion', getEmpleadoController.putGeneralProfesion);

module.exports = router;
