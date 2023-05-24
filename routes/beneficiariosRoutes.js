const express = require("express");
const getBeneficiarioController = require("../controllers/beneficiario_controller");
const router = express.Router();



//GET Method
/**
 * @swagger
 * /egresados:
 *   put:
 *     summary: Actualizar información de un egresado
 *     description: Actualiza la información de un egresado en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_persona:
 *                 type: integer
 *                 description: El ID de la persona.
 *                 example: 1
 *               observacion:
 *                 type: string
 *                 description: Observación del egresado.
 *                 example: "Observación de prueba"
 *               tipo_usuario:
 *                 type: boolean
 *                 description: Tipo de usuario (true = egresado, false = otro tipo).
 *                 example: true
 *     responses:
 *       200:
 *         description: Egresado actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: "successful"
 *                 postEgreso:
 *                   type: object
 *                   description: Detalles del egresado actualizado.
 *       400:
 *         description: Error al actualizar el egresado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Error al actualizar el egresado"
 */
router.post('/egresar', getBeneficiarioController.putEgresado);

/**
 * @swagger
 * /beneficiarios:
 *   post:
 *     summary: Crear un beneficiario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: El ID del beneficiario.
 *                 example: 1
 *               id_tipo_doc:
 *                 type: integer
 *                 description: El ID del tipo de documento.
 *                 example: 1
 *               p_nombre:
 *                 type: string
 *                 description: El primer nombre del beneficiario.
 *                 example: Juan
 *               s_nombre:
 *                 type: string
 *                 description: El segundo nombre del beneficiario.
 *                 example: Carlos
 *               p_apellido:
 *                 type: string
 *                 description: El primer apellido del beneficiario.
 *                 example: Pérez
 *               s_apellido:
 *                 type: string
 *                 description: El segundo apellido del beneficiario.
 *                 example: Gómez
 *               id_sede:
 *                 type: integer
 *                 description: El ID de la sede.
 *                 example: 1
 *               fecha_nacimiento:
 *                 type: string
 *                 description: La fecha de nacimiento del beneficiario.
 *                 example: "2001-01-01"
 *               id_genero:
 *                 type: integer
 *                 description: El ID del género.
 *                 example: 1
 *               id_orientacion:
 *                 type: integer
 *                 description: El ID de la orientación.
 *                 example: 1
 *               id_eps:
 *                 type: integer
 *                 description: El ID de la EPS.
 *                 example: 1
 *               id_psicologo:
 *                 type: integer
 *                 description: El ID del psicólogo.
 *                 example: 1
 *               id_trabajador_social:
 *                 type: integer
 *                 description: El ID del trabajador social.
 *                 example: 1
 *               estado:
 *                 type: boolean
 *                 description: El estado del beneficiario.
 *                 example: true
 *     responses:
 *       200:
 *         description: Beneficiario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: El estado de la operación.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: El mensaje de la operación.
 *                   example: "successful"
 *                 postBeneficiario:
 *                   type: object
 *                   description: El objeto del beneficiario creado.
 *       400:
 *         description: Error al crear el beneficiario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: El estado de la operación.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: El mensaje de error.
 *                   example: "error"
 */
router.post('/create', getBeneficiarioController.postBeneficiario);


/**
 * @swagger
 * /api/beneficiarios/last-ten:
 *   get:
 *     tags:
 *       - Beneficiarios
 *     description: Obtiene los últimos 10 beneficiarios
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Un objeto con el estado, mensaje y lista de los últimos 10 beneficiarios
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 *             beneficiarios_lastTen:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beneficiario'
 *       400:
 *         description: Error en la solicitud
 */
router.get('/last_ten', getBeneficiarioController.getLastTenBeneficiarios);

/**
 * @swagger
 * path:
 *  /beneficiarios/estadisticas:
 *    get:
 *      summary: Obtiene estadísticas de beneficiarios
 *      tags: [Beneficiarios]
 *      responses:
 *        200:
 *          description: Estadísticas de beneficiarios obtenidas correctamente
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: "successful"
 *                  beneficiarios_actuales:
 *                    type: integer
 *                    example: 100
 *                  beneficiarios_egresados:
 *                    type: integer
 *                    example: 50
 *                  beneficiarios_nuevos:
 *                    type: integer
 *                    example: 20
 *        400:
 *          description: Error al obtener las estadísticas de beneficiarios
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: "error"
 */
router.get('/estadisticas', getBeneficiarioController.getStatisticsBeneficiarios);

/**
 * @swagger
 * /endpoint:
 *   get:
 *     summary: Get beneficiario by name
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the beneficiario to search for
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   example: successful
 *                   description: Message indicating the status of the request
 *                 getBuscaPorNombre:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Add properties here that define the response object
 *     '400':
 *       description: Error response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: false
 *                 description: Indicates if the request was unsuccessful
 *               message:
 *                 type: string
 *                 example: error message
 *                 description: Message indicating the reason for the error
 */
router.get('/ten/', getBeneficiarioController.getBuscaPorNombre);

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Obtener el balance de beneficiarios
 *     description: Devuelve el balance de beneficiarios nuevos y egresados para el año especificado.
 *     parameters:
 *       - in: query
 *         name: anio
 *         schema:
 *           type: integer
 *         description: El año para el que se quiere obtener el balance
 *         example: 2023
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
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "successful"
 *                 getBalance_Nuevos:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Balance de beneficiarios nuevos
 *                 getBalance_Egresados:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Balance de beneficiarios egresados
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
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error message"
 */
router.get('/balance/', getBeneficiarioController.getBalance);

/**
 * @swagger
 * /anios:
 *   get:
 *     summary: Obtiene la lista de años disponibles
 *     description: Este endpoint retorna la lista de años disponibles en el servicio beneficiario
 *     responses:
 *       200:
 *         description: La petición fue exitosa y se obtuvo la lista de años
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la petición
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 getAnios:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: Lista de años disponibles
 *       400:
 *         description: Error en la petición
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la petición
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get('/anios', getBeneficiarioController.getAnios);

/**
 * @swagger
 * /endpoint:
 *   get:
 *     description: Descripción del endpoint
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la solicitud
 *     parameters:
 *       - name: parametro1
 *         description: Descripción del parámetro 1
 *         in: query
 *         type: string
 *         required: true
 *       - name: parametro2
 *         description: Descripción del parámetro 2
 *         in: query
 *         type: integer
 *         required: false
 */

router.get('/estadisticas/Diagnosticos', getBeneficiarioController.getDiagBen);

/**
 * @swagger
 * /endpoint/path:
 *   get:
 *     summary: Returns the estimated age of beneficiaries
 *     description: Returns the estimated age of beneficiaries based on some criteria
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   example: successful
 *                   description: Message of the response
 *                 estEdad:
 *                   type: number
 *                   example: 30
 *                   description: Estimated age of beneficiaries
 *       400:
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   example: Error message
 *                   description: Error message of the response
 */

router.get('/estadisticas/edad', getBeneficiarioController.getEstEdad);

/**
 * @swagger
 * /beneficiarios:
 *   get:
 *     summary: Obtiene los beneficiarios
 *     description: Obtiene los beneficiarios actuales y los filtra por pagina, sede, edad, diagnostico principal, y fecha de ingreso.
 *     parameters:
 *       - in: query
 *         name: pagina
 *         description: La pagina de resultados a obtener
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: Sede
 *         description: La sede del beneficiario
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: Edad
 *         description: La edad del beneficiario
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 0
 *       - in: query
 *         name: Diagnostico_p
 *         description: El diagnostico principal del beneficiario
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: Fecha_ingreso
 *         description: La fecha de ingreso del beneficiario
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Los beneficiarios fueron obtenidos
 */
router.get('/listAll/', getBeneficiarioController.getBeneficiarios);


router.get('/desplegables', getBeneficiarioController.getDesplegables);
router.get('/perfil/', getBeneficiarioController.getPerfil);

router.get('/list/diagnostico/', getBeneficiarioController.getDiagnosticoList);
router.get('/list/sede/', getBeneficiarioController.getSedeList);
router.get('/list/riesgos/', getBeneficiarioController.getRiesgosList);
router.get('/list/alergias/', getBeneficiarioController.getAlergiasList);
router.get('/list/orientacion/', getBeneficiarioController.getOrientacionList);
router.get('/list/genero', getBeneficiarioController.getGeneroList);
router.get('/list/eps', getBeneficiarioController.getEpsList);

router.post('/new/diagnostico', getBeneficiarioController.postDiagnostico);
router.post('/new/sede', getBeneficiarioController.postSede);
router.post('/new/riesgos', getBeneficiarioController.postRiesgos);
router.post('/new/alergias', getBeneficiarioController.postAlergias);
router.post('/new/orientacion', getBeneficiarioController.postOrientacion);
router.post('/new/genero', getBeneficiarioController.postGenero);
router.post('/new/eps', getBeneficiarioController.postEps);

router.post('/edit/diagnostico', getBeneficiarioController.putDiagnostico);
router.put('/edit/sede', getBeneficiarioController.putSede);
router.post('/edit/riesgos', getBeneficiarioController.putRiesgos);
router.post('/edit/alergias', getBeneficiarioController.putAlergias);
router.put('/edit/orientacion', getBeneficiarioController.putOrientacion);

router.delete('/delete/diagnostico', getBeneficiarioController.deleteDiagnostico);
router.delete('/delete/riesgos', getBeneficiarioController.deleteRiesgos);
router.delete('/delete/alergias', getBeneficiarioController.deleteAlergias);

router.post('/consulta', getBeneficiarioController.postConsulta);

module.exports = router;


