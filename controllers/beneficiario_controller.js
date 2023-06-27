const response = require("./responses/response");
const beneficiarioServices = require("../infraestructure/services/beneficiarios.services/beneficiarios_service");

exports.putEgresado= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const egreso = {
      id_persona: req.body.id_persona, 
      observacion: req.body.observacion,
      tipo_usuario: true,
    };

    result.postEgreso =
      await beneficiarioServices.putEgreso(egreso);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postFoto = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    console.log(req.file);

    result.postFoto = 
      await beneficiarioServices.postFoto(req);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,  
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postConsulta= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    result.postConsultas = 
      await beneficiarioServices.postConsulta(req);
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postFormat = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.postFormat = 
      await beneficiarioServices.postFormat(req);
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postAdjuntos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    console.log(req.body.file);
    result.postAdjuntos = 
      await beneficiarioServices.postAdjuntos(req);
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putConsulta= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    result.putConsulta = 
      await beneficiarioServices.putConsulta(req);
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putAdjuntos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.putAdjuntos = 
      await beneficiarioServices.putAdjuntos(req);
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.deleteAlergias= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const Alergia = {
      id_beneficiario: req.body.id_beneficiario, 
      id_alergia: req.body.id_value
    };

    const camposLlenos = Object.values(Alergia).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.deleteAlergias = 
        await beneficiarioServices.deleteAlergias(Alergia);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.deleteMedicamento= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const Medicamento = {
      id_beneficiario: req.body.id_beneficiario, 
      id_medicamento: req.body.id_value
    };

    const camposLlenos = Object.values(Medicamento).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.deleteMedicamento = 
        await beneficiarioServices.deleteMedicamento(Medicamento);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.deleteRiesgos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const Riesgos = {
      id_beneficiario: req.body.id_beneficiario, 
      id_riesgo: req.body.id_value
    };

    const camposLlenos = Object.values(Riesgos).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.deleteRiesgos = 
        await beneficiarioServices.deleteRiesgos(Riesgos);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.deleteDiagnostico= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const Diagnostico = {
      id_beneficiario: req.body.id_beneficiario, 
      id_diagnostico: req.body.id_value
    };

    const camposLlenos = Object.values(Diagnostico).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.deleteDiagnostico = 
        await beneficiarioServices.deleteDiagnostico(Diagnostico);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};



exports.putOrientacion= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const orientacion = {
      id_beneficiario: req.body.id_beneficiario, 
      id_orientacion: req.body.id_value,
    };

    const camposLlenos = Object.values(orientacion).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putOrientacion = 
        await beneficiarioServices.putOrientacion(orientacion);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putAlergias= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const alergia = {
      id_beneficiario: req.body.id_beneficiario, 
      id_alergia: req.body.id_value,
      id_empleado: req.body.id_empleado, 
      observacion: req.body.observacion
    };

    const camposLlenos = Object.values(alergia).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putAlergias = 
        await beneficiarioServices.putAlergias(alergia);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putInfo= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const info = {
      id_beneficiario: req.body.id_beneficiario,
      p_nombre: req.body.p_nombre, 
      s_nombre: req.body.s_nombre, 
      p_apellido: req.body.p_apellido,
      s_apellido: req.body.s_apellido,
      id_tipo_doc: req.body.id_tipo_doc
    };

    const camposLlenos = Object.values(info).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putInfo = 
        await beneficiarioServices.putInfo(info);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putRiesgos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const riesgo = {
      id_beneficiario: req.body.id_beneficiario, 
      id_riesgo: req.body.id_value,
      id_empleado: req.body.id_empleado,
      observacion: req.body.observacion
    };

    const camposLlenos = Object.values(riesgo).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putDiagnostico = 
        await beneficiarioServices.putRiesgos(riesgo);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putMedicamento= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const medicamento = {
      id_beneficiario: req.body.id_beneficiario, 
      id_medicamento: req.body.id_value,
      id_empleado: req.body.id_empleado,
      observacion: req.body.observacion
    };

    const camposLlenos = Object.values(medicamento).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putMedicamento = 
        await beneficiarioServices.putMedicamento(medicamento);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putSede= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const sede = {
      id_beneficiario: req.body.id_beneficiario, 
      id_sede_proxima: req.body.id_value
    };

    const camposLlenos = Object.values(sede).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putSede = 
        await beneficiarioServices.putSede(sede);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putTrabajadorSocial= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const trabajador_social = {
      id_beneficiario: req.body.id_beneficiario, 
      id_trabajador_social: req.body.id_value
    };

    const camposLlenos = Object.values(trabajador_social).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putTrabajadorSocial = 
        await beneficiarioServices.putTrabajadorSocial(trabajador_social);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putPsicologo= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const psicologo = {
      id_beneficiario: req.body.id_beneficiario, 
      id_psicologo: req.body.id_value
    };

    const camposLlenos = Object.values(psicologo).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putPsicologo = 
        await beneficiarioServices.putPsicologo(psicologo);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putTipoDoc= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const tipoDoc = {
      id_beneficiario: req.body.id_beneficiario, 
      id_TipoDoc_proximo: req.body.id_value
    };

    const camposLlenos = Object.values(tipoDoc).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putTipoDoc = 
        await beneficiarioServices.putTipoDoc(tipoDoc);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putEps= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const eps = {
      id_beneficiario: req.body.id_beneficiario, 
      id_eps_proxima: req.body.id_value
    };

    const camposLlenos = Object.values(eps).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putEps = 
        await beneficiarioServices.putEps(eps);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};



exports.putDiagnostico= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const diagnostico = {
      id_enfermedad: req.body.id_value, 
      id_beneficiario: req.body.id_beneficiario, 
      id_empleado: req.body.id_empleado,
      tipo: req.body.tipo, 
      observacion: req.body.observacion
    };

    const camposLlenos = Object.values(diagnostico).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putDiagnostico = 
        await beneficiarioServices.putDiagnostico(diagnostico);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postOrientacion= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const orientacion = req.body.value;

    if (orientacion.length !== 0){
      result.postOrientacion = 
        await beneficiarioServices.postOrientacion(orientacion);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postAlergias= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const alergia = req.body.value;

    if (alergia.length !== 0){
      result.postAlergias = 
        await beneficiarioServices.postAlergias(alergia);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postRiesgos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const riesgo = req.body.value;

    if (riesgo.length !== 0){
      result.postRiesgos = 
        await beneficiarioServices.postRiesgos(riesgo);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postMedicamento= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const medicamento = req.body.value;

    if (medicamento.length !== 0){
      result.postMedicamento = 
        await beneficiarioServices.postMedicamento(medicamento);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postSede= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const sede = {
      sede: req.body.value, 
      direccion: req.body.complement
    };
    const camposLlenos = Object.values(sede).every((value) => value !== undefined && value !== '');
    if (camposLlenos){
      result.postSede = 
        await beneficiarioServices.postSede(sede);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


  exports.postTipoDoc= async (req, res, next) => {
    try {
      const result = {
        status: true,
        message: "successful",
      };
      const tipoDoc = {
        tipoDoc: req.body.tipoDoc, 
        abreviacion: req.body.abreviacion
      };
      const camposLlenos = Object.values(tipoDoc).every((value) => value !== undefined && value !== '');
      if (camposLlenos){
        result.postTipoDoc = 
          await beneficiarioServices.postTipoDoc(tipoDoc);
      }else{
        console.error(error.message);
        response.error(req, res, result, 400, "error");
      }
      response.success(req, res, result, 200, "success");
    } catch (error) {
      const result = {
        status: false,
        message: error.message,
      };
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
  };


exports.postEps= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    eps = req.body.value;
    if (eps.length !== 0){
      result.postEps = 
        await beneficiarioServices.postEps(eps);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postGenero= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    genero = req.body.value;
    if (genero.length !== 0){
      result.postGenero = 
        await beneficiarioServices.postGenero(genero);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.postDiagnostico= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    diagnostico = req.body.value;
    if (diagnostico.length !== 0){
      result.postDiagnostico = 
        await beneficiarioServices.postDiagnostico(diagnostico);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getFoto = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const id = req.query.Id;
    const file = await beneficiarioServices.getFoto(id);

    result.archivo = file;

    res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
    res.setHeader('Content-Type', file.type);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.getConsultaBuffer = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const info = {
     hex: req.body.hex,
     isFormat: req.body.isFormat,
    }
    const file = await beneficiarioServices.getConsultaBuffer(info);

    result.reporte = file;

    if(!req.body.isFormat){
      res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
      res.setHeader('Content-Type', file.type);
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.getEpsList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    eps = req.query.Search;
    result.getList =
      await beneficiarioServices.getEpsList(eps);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.getGeneroList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    genero = req.query.Search;

    result.getList =
      await beneficiarioServices.getGeneroList(genero);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getTipoDocList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    tipoDoc = req.query.Search;

    result.getList =
      await beneficiarioServices.getTipoDocList(tipoDoc);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.getAlergiasList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await beneficiarioServices.getAlergiasList(req.query.Search);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getOrientacionList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await beneficiarioServices.getOrientacionList(req.query.Search);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getMedicamentoList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await beneficiarioServices.getMedicamentoList(req.query.Search);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getRiesgosList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await beneficiarioServices.getRiesgosList(req.query.Search);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getConsulta= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const list = {
        id: req.query.Id, 
        isFormat: req.query.isFormat
    };

    result.getConsulta =
      await beneficiarioServices.getConsulta(list);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getSedeList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await beneficiarioServices.getSedeList(req.query.Search);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getDiagnosticoList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await beneficiarioServices.getDiagnosticoList(req.query.Search);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getPerfil= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getPerfil =
      await beneficiarioServices.getPerfil(req.query.id);

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.postBeneficiario = async (req, res, next) =>{
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const beneficiario = {
      id: req.body.id,
      id_tipo_doc: req.body.id_tipo_doc,
      p_nombre: req.body.p_nombre,
      s_nombre: req.body.s_nombre,
      p_apellido: req.body.p_apellido,
      s_apellido: req.body.s_apellido,
      id_sede: req.body.id_sede, 
      fecha_nacimiento:req.body.fecha_nacimiento, 
      id_genero:req.body.id_genero,
      id_orientacion:req.body.id_orientacion,
      id_eps:req.body.id_eps,
      id_psicologo: req.body.id_psicologo, 
      id_trabajador_social:req.body.id_trabajador_social, 
      estado: true,
    };

    result.postBeneficiario = 
      await beneficiarioServices.post_beneficiario(beneficiario);
    
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getDesplegables= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    
    result.getBeneficiariosDiagnosticos =
      await beneficiarioServices.getBeneficiariosDiagnosticos();
    result.getBeneficiariosSedes =
      await beneficiarioServices.getBeneficiariosSedes();
    result.getBeneficiariosGenero =
      await beneficiarioServices.getBeneficiariosGenero();
    result.getBeneficiariosRiesgos =
      await beneficiarioServices.getBeneficiariosRiesgos();
    result.getBeneficiariosOrientacion =
      await beneficiarioServices.getBeneficiariosOrientacion();
      
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};
exports.getBeneficiarios = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    
    const page = req.query;
    
    result.Total =
    (await beneficiarioServices.getBeneficiariosActuales()).value;

    result.getBeneficiarios =
      await beneficiarioServices.getBeneficiarios(page);
    
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.getEstEdad= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.estEdad =
      await beneficiarioServices.getEstEdad();
      
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getDiagBen= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const cantidad = await beneficiarioServices.getBeneficiariosActuales();
    
    result.cantidad_de_beneficiarios = cantidad.value;
    result.diagnosticos =
      await beneficiarioServices.getDiagnosticos();
      
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getAnios= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getAnios =
      await beneficiarioServices.getAnios();
      
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.getBalance= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const anio = req.query;
    result.getBalance =
      await beneficiarioServices.getBalance(anio);
      
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getBuscaPorNombre = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const nombre = req.query;
    result.getBuscaPorNombre =
      await beneficiarioServices.getBuscaPorNombre(nombre);
      
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.getLastTenBeneficiarios = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.beneficiarios_lastTen =
      await beneficiarioServices.getBeneficiariosLastTen();
      
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.getStatisticsBeneficiarios = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };


    result.beneficiarios_actuales =
      await beneficiarioServices.getBeneficiariosActuales();
    result.beneficiarios_egresados =
      await beneficiarioServices.getBeneficiariosEgresados();
    result.beneficiarios_nuevos =
      await beneficiarioServices.getBeneficiariosNuevos();

    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putGeneralDiagnosticos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const diagnostico = {
      id_diagnostico: req.body.id_value,
      diagnostico: req.body.value
    };

    const camposLlenos = Object.values(diagnostico).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putDiagnostico = 
        await beneficiarioServices.putGeneralDiagnosticos(diagnostico);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putGeneralRiesgos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const riesgo = {
      id_riesgo: req.body.id_value,
      riesgo: req.body.value
    };

    const camposLlenos = Object.values(riesgo).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralRiesgos = 
        await beneficiarioServices.putGeneralRiesgos(riesgo);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.putGeneralMedicamento= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const medicamento = {
      id_medicamento: req.body.id_value,
      medicamento: req.body.value
    };

    const camposLlenos = Object.values(medicamento).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralMedicamento = 
        await beneficiarioServices.putGeneralMedicamento(medicamento);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putGeneralAlergia= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const alergia = {
      id_alergia: req.body.id_value,
      alergia: req.body.value
    };

    const camposLlenos = Object.values(alergia).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralAlergia = 
        await beneficiarioServices.putGeneralAlergia(alergia);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putGeneralEps= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const eps = {
      id_eps: req.body.id_value,
      eps: req.body.value
    };

    const camposLlenos = Object.values(eps).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralEps = 
        await beneficiarioServices.putGeneralEps(eps);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putGeneralGenero= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const genero = {
      id_genero: req.body.id_value,
      genero: req.body.value
    };

    const camposLlenos = Object.values(genero).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralGenero = 
        await beneficiarioServices.putGeneralGenero(genero);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putGeneralOrientacion= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const orientacion = {
      id_orientacion: req.body.id_value,
      orientacion: req.body.value
    };

    const camposLlenos = Object.values(orientacion).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralOrientacion = 
        await beneficiarioServices.putGeneralOrientacion(orientacion);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putGeneralSede= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const sede = {
      id_sede: req.body.id_value,
      sede: req.body.value,
      direccion: req.body.complement
    };

    const camposLlenos = Object.values(sede).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralSede = 
        await beneficiarioServices.putGeneralSede(sede);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};

exports.putGeneralTipoDoc= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const tipo_doc = {
      id_tipo_doc: req.body.id_value,
      tipo_doc: req.body.value,
      abreviacion: req.body.complement
    };

    const camposLlenos = Object.values(tipo_doc).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralTipoDoc = 
        await beneficiarioServices.putGeneralTipoDoc(tipo_doc);
    }else{
      console.error(error.message);
      response.error(req, res, result, 400, "error");
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};