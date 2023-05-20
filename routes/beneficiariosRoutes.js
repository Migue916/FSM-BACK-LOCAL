const express = require("express");
const getBeneficiarioController = require("../controllers/beneficiario_controller");
const router = express.Router();



//GET Method
router.post('/egresar', getBeneficiarioController.putEgresado);
router.post('/create', getBeneficiarioController.postBeneficiario);
router.get('/last_ten', getBeneficiarioController.getLastTenBeneficiarios);
router.get('/estadisticas', getBeneficiarioController.getStatisticsBeneficiarios);
router.get('/ten/', getBeneficiarioController.getBuscaPorNombre);
router.get('/balance/', getBeneficiarioController.getBalance);
router.get('/anios', getBeneficiarioController.getAnios);
router.get('/estadisticas/Diagnosticos', getBeneficiarioController.getDiagBen);
router.get('/estadisticas/edad', getBeneficiarioController.getEstEdad);
router.get('/list/', getBeneficiarioController.getBeneficiarios);
router.get('/desplegables', getBeneficiarioController.getDesplegables);
router.get('/perfil/', getBeneficiarioController.getPerfil);

router.get('/list/diagnostico/', getBeneficiarioController.getDiagnosticoList);
router.get('/list/sede/', getBeneficiarioController.getSedeList);
router.get('/list/riesgos/', getBeneficiarioController.getRiesgosList);
router.get('/list/alergias/', getBeneficiarioController.getAlergiasList);
router.get('/list/orientacion/', getBeneficiarioController.getOrientacionList);

router.post('/new/diagnostico', getBeneficiarioController.postDiagnostico);
router.post('/new/sede', getBeneficiarioController.postSede);
router.post('/new/riesgos', getBeneficiarioController.postRiesgos);
router.post('/new/alergias', getBeneficiarioController.postAlergias);
router.post('/new/orientacion', getBeneficiarioController.postOrientacion);

router.post('/edit/diagnostico', getBeneficiarioController.putDiagnostico);
router.put('/edit/sede', getBeneficiarioController.putSede);
router.post('/edit/riesgos', getBeneficiarioController.putRiesgos);
router.post('/edit/alergias', getBeneficiarioController.putAlergias);
router.put('/edit/orientacion', getBeneficiarioController.putOrientacion);

router.delete('/delete/diagnostico', getBeneficiarioController.deleteDiagnostico);
router.delete('/delete/riesgos', getBeneficiarioController.deleteRiesgos);
router.delete('/delete/alergias', getBeneficiarioController.deleteAlergias);////////////////////////////



module.exports = router;


