const express = require("express");
const getEmpleadoController = require("../controllers/empleado_controller");
const router = express.Router();



//GET Method
router.get('/estadisticas', getEmpleadoController.getStatisticsEmpleados);
router.get('/estadisticas/genero', getEmpleadoController.getStatisticsEmpleadosGenero);
router.get('/estadisticas/modulo', getEmpleadoController.getStatisticsEmpleadosModulo);
router.get('/lastTen', getEmpleadoController.getEmpleados);
router.get('/ten/', getEmpleadoController.getEmpleadosPorNombre);
router.get('/saludo/', getEmpleadoController.getNombre);

module.exports = router;
