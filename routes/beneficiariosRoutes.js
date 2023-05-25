const express = require("express");
const getBeneficiarioController = require("../controllers/beneficiario_controller");
const router = express.Router();

/**
 * @swagger
 * /beneficiarios/egresar:
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
 * /beneficiarios/create:
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
 * /beneficiarios/last_ten:
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
 * /beneficiarios/ten/:
 *   get:
 *     summary: Busca por nombre
 *     description: Realiza una búsqueda por nombre
 *     parameters:
 *       - name: nombre
 *         in: query
 *         description: Nombre a buscar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Búsqueda exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 getBuscaPorNombre:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BuscaPorNombre'
 */

router.get('/ten/', getBeneficiarioController.getBuscaPorNombre);

/**
 * @swagger
 * /beneficiarios/balance:
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
 * /beneficiarios/anios:
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
 * /beneficiarios/estadisticas/Diagnosticos:
 *   get:
 *     summary: Obtiene el diagnóstico y la cantidad de beneficiarios
 *     description: Obtiene el diagnóstico y la cantidad de beneficiarios actuales del sistema
 *     responses:
 *       200:
 *         description: La operación fue exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 cantidad_de_beneficiarios:
 *                   type: integer
 *                 diagnosticos:
 *                   type: array
 *                   items:
 *                     type: object
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

router.get('/estadisticas/Diagnosticos', getBeneficiarioController.getDiagBen);

/**
 * @swagger
 * /beneficiarios/estadisticas/edad:
 *   get:
 *     description: Obtiene el resultado del cálculo de EstEdad
 *     tags:
 *       - EstEdad
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Resultado exitoso
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 *             estEdad:
 *               type: integer
 *       400:
 *         description: Error en la solicitud
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 */

router.get('/estadisticas/edad', getBeneficiarioController.getEstEdad);

/**
 * @swagger
 * /beneficiarios/listAll/:
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

/**
 * @swagger
 * /beneficiarios/desplegables:
 *   get:
 *     summary: Obtiene los desplegables y sus datos relacionados
 *     description: Este endpoint devuelve los desplegables y sus datos relacionados, incluyendo beneficiarios por edades, beneficiarios por diagnosticos, beneficiarios por sedes y fechas de ingreso.
 *     responses:
 *       200:
 *         description: Desplegables y datos relacionados obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa o no
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Contiene el mensaje de éxito o error
 *                   example: "success"
 *                 getBeneficiariosEdades:
 *                   type: object
 *                   description: Datos de beneficiarios por edades
 *                   example: { data: [...], ... }
 *                 getBeneficiariosDiagnosticos:
 *                   type: object
 *                   description: Datos de beneficiarios por diagnosticos
 *                   example: { data: [...], ... }
 *                 getBeneficiariosSedes:
 *                   type: object
 *                   description: Datos de beneficiarios por sedes
 *                   example: { data: [...], ... }
 *                 getBeneficiariosFechasIng:
 *                   type: object
 *                   description: Datos de beneficiarios por fechas de ingreso
 *                   example: { data: [...], ... }
 *       400:
 *         description: Error en la operación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa o no
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Contiene el mensaje de éxito o error
 *                   example: "error"
 */

router.get('/desplegables', getBeneficiarioController.getDesplegables);

/**
 * @swagger
 * /beneficiarios/perfil/:
 *   get:
 *     summary: Obtiene el perfil de un beneficiario
 *     description: Obtiene el perfil de un beneficiario utilizando su ID
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del beneficiario
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
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
 *                   $ref: '#/components/schemas/Perfil'
 *       400:
 *         description: Error al obtener el perfil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 * */

router.get('/perfil/', getBeneficiarioController.getPerfil);


/**
 * @swagger
 * /beneficiarios/list/diagnostico/:
 *   get:
 *     tags:
 *       - Diagnostico
 *     description: Obtiene la lista de diagnósticos
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Diagnostico
 *         description: Filtra la lista de diagnósticos por el valor de Diagnostico
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de diagnósticos obtenida exitosamente
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 *             getDiagnosticoList:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Error al obtener la lista de diagnósticos
 */

router.get('/list/diagnostico/', getBeneficiarioController.getDiagnosticoList);

/**
 * @swagger
 * /beneficiarios/list/sede/:
 *   get:
 *     summary: Obtiene la lista de sedes
 *     description: Retorna un objeto que contiene la lista de sedes y un mensaje de éxito
 *     tags:
 *       - Sede
 *     parameters:
 *       - in: query
 *         name: Sede
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre de la sede a buscar (opcional)
 *     responses:
 *       200:
 *         description: Solicitud exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 getSedeList:
 *                   type: array
 *                   items:
 *                     type: object
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
 * */

router.get('/list/sede/', getBeneficiarioController.getSedeList);


/**
 * @swagger
 * /beneficiarios/list/riesgos/:
 *   get:
 *     summary: Obtiene la lista de riesgos
 *     description: Obtiene la lista de riesgos basada en los parámetros de consulta proporcionados
 *     tags:
 *       - Riesgos
 *     parameters:
 *       - in: query
 *         name: Riesgos
 *         schema:
 *           type: string
 *         description: Los riesgos a buscar en la lista
 *     responses:
 *       200:
 *         description: Éxito en la obtención de la lista de riesgos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 getRiesgosList:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error al obtener la lista de riesgos
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

router.get('/list/riesgos/', getBeneficiarioController.getRiesgosList);

/**
 * @swagger
 * /beneficiarios/list/alergias/:
 *   get:
 *     tags:
 *       - Alergias
 *     description: Obtiene la lista de alergias
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Alergias
 *         description: Filtro de alergias
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de alergias obtenida con éxito
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 *             getAlergiasList:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Error al obtener la lista de alergias
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 */

router.get('/list/alergias/', getBeneficiarioController.getAlergiasList);


/**
 * @swagger
 * /beneficiarios/list/orientacion/:
 *   get:
 *     summary: Obtiene la lista de orientaciones
 *     tags:
 *       - Orientaciones
 *     parameters:
 *       - in: query
 *         name: Orientacion
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtro de orientación
 *     responses:
 *       200:
 *         description: Lista de orientaciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 getOrientacionList:
 *                   type: array
 *                   items:
 *                     type: string
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

router.get('/list/orientacion/', getBeneficiarioController.getOrientacionList);

/**
 * @swagger
 * /beneficiarios/list/genero:
 *   get:
 *     summary: Obtener la lista de géneros
 *     description: Obtiene la lista de géneros de los beneficiarios
 *     responses:
 *       200:
 *         description: Éxito
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
 *                 getGeneroList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del género
 *                       name:
 *                         type: string
 *                         description: Nombre del género
 *       400:
 *         description: Error
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

router.get('/list/genero', getBeneficiarioController.getGeneroList);

/**
 * @swagger
 * /beneficiarios/list/eps:
 *   get:
 *     summary: Retrieve a list of EPS
 *     description: Retrieve a list of EPS for the beneficiary services.
 *     responses:
 *       200:
 *         description: A list of EPS
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 getEpsList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       400:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 * */

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


