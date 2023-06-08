const express = require("express");
const getBeneficiarioController = require("../controllers/beneficiario_controller");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });




router.post('/egresar', getBeneficiarioController.putEgresado);

/**
 * @swagger
 * /beneficiarios/egresar:
 *   post:
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

/**
 * @swagger
 * /beneficiarios/new/diagnostico:
 *   post:
 *     summary: Añadir un nuevo diagnóstico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Diagnostico:
 *                 type: string
 *                 example: "Diabetes"
 *     responses:
 *       200:
 *         description: Diagnóstico añadido con éxito
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
 *                 postDiagnostico:
 *                   type: object
 *       400:
 *         description: Error al añadir el diagnóstico
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
 *                   example: "Error message"
 */

router.post('/new/diagnostico', getBeneficiarioController.postDiagnostico);

/**
 * @swagger
 * /beneficiarios/new/sede:
 *   post:
 *     summary: Añadir una nueva sede
 *     tags: [Sede]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sede:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sede creada exitosamente
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
 *         description: Error al crear la sede
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

router.post('/new/sede', getBeneficiarioController.postSede);

/**
 * @swagger
 * /beneficiarios/new/riesgos:
 *   post:
 *     tags:
 *       - Riesgos
 *     description: Agrega un nuevo riesgo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: riesgo
 *         description: Objeto de riesgo
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             riesgo:
 *               type: string
 *     responses:
 *       200:
 *         description: Riesgo agregado exitosamente
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 *             postRiesgos:
 *               type: object
 *       400:
 *         description: Error al agregar el riesgo
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 * */

router.post('/new/riesgos', getBeneficiarioController.postRiesgos);

/**
 * @swagger
 * /beneficiarios/new/alergias:
 *   post:
 *     summary: Añade una alergia a un beneficiario
 *     description: Este endpoint crea una alergia y la asocia a un beneficiario específico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alergia:
 *                 type: string
 *                 description: La alergia que se va a añadir.
 *                 example: Polen
 *     responses:
 *       200:
 *         description: Alergia añadida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: "successful"
 *                 postAlergias:
 *                   type: object
 *                   description: Alergia añadida.
 *       400:
 *         description: Error al añadir la alergia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "error"
 */

router.post('/new/alergias', getBeneficiarioController.postAlergias);

/**
 * @swagger
 * /beneficiarios/new/orientacion:
 *   post:
 *     summary: Crea una nueva orientación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Orientacion:
 *                 type: string
 *                 description: La orientación a crear.
 *                 example: "Nueva Orientación"
 *     responses:
 *       200:
 *         description: Orientación creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: "successful"
 *                 postOrientacion:
 *                   type: string
 *                   description: Orientación creada.
 *                   example: "Nueva Orientación"
 *       400:
 *         description: Error en la creación de la orientación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Error al crear la orientación"
 */

router.post('/new/orientacion', getBeneficiarioController.postOrientacion);

/**
 * @swagger
 * /beneficiarios/new/genero:
 *   post:
 *     description: Añade un nuevo género
 *     tags:
 *       - generos
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Genero
 *         description: Objeto Genero para añadir
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - Genero
 *           properties:
 *             Genero:
 *               type: string
 *     responses:
 *       200:
 *         description: Género añadido exitosamente
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 *             postGenero:
 *               type: object
 *       400:
 *         description: Error al añadir el género
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *             message:
 *               type: string
 */
router.post('/new/genero', getBeneficiarioController.postGenero);

/**
 * @swagger
 * /beneficiarios/new/eps:
 *   post:
 *     summary: Crea una nueva EPS
 *     description: Crea una nueva EPS y la agrega a la lista de beneficiarios
 *     requestBody:
 *       description: Datos de la nueva EPS
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Eps:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: EPS creada exitosamente
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
 *         description: Error al crear la EPS
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
router.post('/new/eps', getBeneficiarioController.postEps);


/**
 * @swagger
 * /beneficiarios/edit/diagnostico:
 *   post:
 *     summary: Actualizar el diagnóstico de un beneficiario
 *     description: Actualiza el diagnóstico de un beneficiario con los datos proporcionados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_enfermedad:
 *                 type: integer
 *                 description: El ID de la enfermedad.
 *                 example: 1
 *               id_beneficiario:
 *                 type: integer
 *                 description: El ID del beneficiario.
 *                 example: 1
 *               id_empleado:
 *                 type: integer
 *                 description: El ID del empleado.
 *                 example: 1
 *               tipo:
 *                 type: string
 *                 description: El tipo de diagnóstico.
 *                 example: "agudo"
 *               observacion:
 *                 type: string
 *                 description: La observación del diagnóstico.
 *                 example: "Paciente con síntomas leves"
 *     responses:
 *       200:
 *         description: Diagnóstico actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje de la operación.
 *                   example: "successful"
 *       400:
 *         description: Error al actualizar el diagnóstico
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "error"
 */
router.post('/edit/diagnostico', getBeneficiarioController.putDiagnostico);

/**
 * @swagger
 * /beneficiarios/edit/sede:
 *   put:
 *     summary: Actualizar la sede de un beneficiario
 *     description: Actualiza la sede de un beneficiario existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_beneficiario
 *               - id_sede_proxima
 *             properties:
 *               id_beneficiario:
 *                 type: integer
 *                 description: ID del beneficiario.
 *               id_sede_proxima:
 *                 type: integer
 *                 description: ID de la sede próxima.
 *     responses:
 *       200:
 *         description: Sede actualizada con éxito.
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
 *         description: Error al actualizar la sede.
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
router.put('/edit/sede', getBeneficiarioController.putSede);

/**
 * @swagger
 * /beneficiarios/edit/riesgos:
 *   post:
 *     summary: Actualiza la información de riesgos de un beneficiario
 *     tags: [Riesgos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_beneficiario
 *               - id_riesgo
 *               - id_empleado
 *               - observacion
 *             properties:
 *               id_beneficiario:
 *                 type: integer
 *                 description: ID del beneficiario
 *               id_riesgo:
 *                 type: integer
 *                 description: ID del riesgo
 *               id_empleado:
 *                 type: integer
 *                 description: ID del empleado
 *               observacion:
 *                 type: string
 *                 description: Observación del riesgo
 *     responses:
 *       200:
 *         description: Riesgo actualizado correctamente
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
 *       400:
 *         description: Error al actualizar el riesgo
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
 *                   example: error
 */
router.post('/edit/riesgos', getBeneficiarioController.putRiesgos);

/**
 * @swagger
 * /beneficiarios/edit/alergias:
 *   post:
 *     summary: Actualiza las alergias del beneficiario
 *     description: Actualiza las alergias del beneficiario con el ID proporcionado
 *     tags:
 *       - Beneficiarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_beneficiario:
 *                 type: integer
 *               id_alergia:
 *                 type: integer
 *               id_empleado:
 *                 type: integer
 *               observacion:
 *                 type: string
 *             required:
 *               - id_beneficiario
 *               - id_alergia
 *               - id_empleado
 *               - observacion
 *     responses:
 *       200:
 *         description: Alergias actualizadas correctamente
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
 *         description: Error en la actualización de alergias
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
router.post('/edit/alergias', getBeneficiarioController.putAlergias);

/**
 * @swagger
 * /beneficiarios/edit/orientacion:
 *   put:
 *     summary: Actualiza la orientación de un beneficiario
 *     tags:
 *       - Beneficiarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_beneficiario:
 *                 type: integer
 *                 description: ID del beneficiario
 *               id_orientacion:
 *                 type: integer
 *                 description: ID de la orientación
 *     responses:
 *       200:
 *         description: La orientación del beneficiario se actualizó correctamente
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
 *         description: Error al actualizar la orientación del beneficiario
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
router.put('/edit/orientacion', getBeneficiarioController.putOrientacion);

/**
 * @swagger
 * /beneficiarios/delete/diagnostico:
 *   delete:
 *     summary: Elimina un diagnóstico
 *     description: Elimina un diagnóstico basado en los identificadores proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_beneficiario:
 *                 type: integer
 *               id_diagnostico:
 *                 type: integer
 *               id_empleado:
 *                 type: integer
 *             required:
 *               - id_beneficiario
 *               - id_diagnostico
 *               - id_empleado
 *     responses:
 *       200:
 *         description: Diagnóstico eliminado con éxito
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
 *         description: Error al eliminar el diagnóstico
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
router.delete('/delete/diagnostico', getBeneficiarioController.deleteDiagnostico);

/**
 * @swagger
 * /beneficiarios/delete/riesgos:
 *   delete:
 *     summary: Elimina un riesgo asociado a un beneficiario
 *     tags: [Riesgos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_beneficiario:
 *                 type: integer
 *                 description: ID del beneficiario
 *               id_riesgo:
 *                 type: integer
 *                 description: ID del riesgo
 *     responses:
 *       200:
 *         description: Riesgo eliminado correctamente
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
 *         description: Error al eliminar el riesgo
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
router.delete('/delete/riesgos', getBeneficiarioController.deleteRiesgos);

/**
 * @swagger
 * /beneficiarios/delete/alergias:
 *   delete:
 *     summary: Elimina una alergia de un beneficiario
 *     tags: [Alergias]
 *     parameters:
 *       - in: body
 *         name: id_beneficiario
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del beneficiario
 *       - in: body
 *         name: id_alergia
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID de la alergia
 *       - in: body
 *         name: id_empleado
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del empleado que realiza la acción
 *     responses:
 *       200:
 *         description: Alergia eliminada correctamente
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
 *                 deleteAlergias:
 *                   type: object
 *       400:
 *         description: Error al eliminar la alergia
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
router.delete('/delete/alergias', getBeneficiarioController.deleteAlergias);

/**
 * @swagger
 * /beneficiarios/consulta:
 *   post:
 *     summary: Realiza una consulta de beneficiario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_empleado:
 *                 type: integer
 *                 description: El ID del empleado que realiza la consulta
 *               id_beneficiario:
 *                 type: integer
 *                 description: El ID del beneficiario consultado
 *               id_modulo:
 *                 type: integer
 *                 description: El ID del módulo en el que se realiza la consulta
 *               consulta:
 *                 type: file
 *                 description: La consulta realizada por el empleado
 *     responses:
 *       200:
 *         description: Consulta realizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de éxito de la consulta
 *                 message:
 *                   type: string
 *                   description: Mensaje de resultado de la consulta
 *                 postConsultas:
 *                   type: object
 *                   description: Resultado de la consulta realizada
 *       400:
 *         description: Error al realizar la consulta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de error de la consulta
 *                 message:
 *                   type: string
 *                   description: Mensaje de error de la consulta
 */
router.post('/consulta', getBeneficiarioController.postConsulta);


/**
 * @swagger
 * /beneficiarios/consulta/:
 *   get:
 *     summary: Consulta de beneficiario
 *     description: Obtiene información del beneficiario basándose en el ID proporcionado.
 *     parameters:
 *       - in: query
 *         name: Id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del beneficiario
 *     responses:
 *       200:
 *         description: Información del beneficiario
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
 *       400:
 *         description: Error al obtener la información del beneficiario
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
router.get('/consulta/', getBeneficiarioController.getConsulta);

/**
 * @swagger
 * /beneficiarios/perfil-foto/:
 *   post:
 *     summary: Subir una foto de perfil para un beneficiario
 *     description: Permite subir una foto de perfil para un beneficiario, almacenándola en el servidor y asociándola al beneficiario correspondiente.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: El ID del beneficiario.
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: La foto de perfil del beneficiario.
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
 *                   description: Estado de la operación.
 *                 message:
 *                   type: string
 *                   description: Mensaje de la operación.
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Estado de la operación.
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.post('/perfil-foto/', upload.single('foto'), getBeneficiarioController.postFoto);

/**
 * @swagger
 * '/beneficiarios/perfil-foto/':
 *   get:
 *     tags:
 *       - Beneficiario Controller
 *     summary: Obtiene la foto del beneficiario
 *     parameters:
 *       - in: query
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador del beneficiario
 *     responses:
 *       200:
 *         description: Foto obtenida con éxito
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
 *                 getFoto:
 *                   type: string
 *                   example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQN..."
 *       400:
 *         description: Error al obtener la foto
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
 *                   example: "Error message"
 */
router.get('/perfil-foto/', getBeneficiarioController.getFoto);

/**
 * @swagger
 * /beneficiarios/list/tipo-doc:
 *   get:
 *     summary: Obtiene la lista de tipos de documentos de beneficiarios
 *     description: Retorna la lista de tipos de documentos de beneficiarios en base al tipo de documento proporcionado
 *     parameters:
 *       - in: query
 *         name: TipoDoc
 *         schema:
 *           type: string
 *         description: El tipo de documento a filtrar
 *     responses:
 *       200:
 *         description: Lista de tipos de documentos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 getTipoDocList:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error al obtener la lista de tipos de documentos
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
router.get('/list/tipo-doc', getBeneficiarioController.getTipoDocList);
module.exports = router;


