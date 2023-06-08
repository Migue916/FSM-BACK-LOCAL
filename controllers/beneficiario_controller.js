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

exports.postFoto= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

      const id = req.body.id; 
      const foto = req.file.buffer;

    result.postFoto = 
      await beneficiarioServices.postFoto(id, foto);
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

    const consulta  = {
      id_empleado: req.body.id_empleado, 
      id_beneficiario: req.body.id_beneficiario, 
      id_modulo: req.body.id_modulo,
      consulta: req.file.consulta 
    };

    result.postConsultas = 
      await beneficiarioServices.postConsulta(consulta);
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
      id_alergia: req.body.id_alergia,
      id_empleado: req.body.id_empleado
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



exports.deleteRiesgos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const Riesgos = {
      id_beneficiario: req.body.id_beneficiario, 
      id_riesgo: req.body.id_riesgo
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
      id_diagnostico: req.body.id_diagnostico,
      id_empleado: req.body.id_empleado
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
      id_orientacion: req.body.id_orientacion,
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
      id_alergia: req.body.id_alergia,
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


exports.putRiesgos= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const riesgo = {
      id_beneficiario: req.body.id_beneficiario, 
      id_riesgo: req.body.id_riesgo,
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



exports.putSede= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const sede = {
      id_beneficiario: req.body.id_beneficiario, 
      id_sede_proxima: req.body.id_sede_proxima
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


exports.putDiagnostico= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const diagnostico = {
      id_enfermedad: req.body.id_enfermedad, 
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
    const orientacion = req.body.Orientacion;

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
    const alergia = req.body.alergia;

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
    const riesgo = req.body.riesgo;

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

exports.postSede= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const sede = {
      sede: req.body.sede, 
      direccion: req.body.direccion
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

exports.postEps= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    eps = req.body.Eps;
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
    genero = req.body.Genero;
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
    diagnostico = req.body.Diagnostico;
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
    id = req.query.Id;
    result.getFoto =
      await beneficiarioServices.getFoto(id);

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
    id = req.query.Id;
    result.getConsulta =
      await beneficiarioServices.getConsulta(id);

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
    eps = req.query.Eps;
    result.getEpsList =
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

    genero = req.query.Genero;

    result.getGeneroList =
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

    tipoDoc = req.query.TipoDoc;

    result.getTipoDocList =
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

    result.getAlergiasList =
      await beneficiarioServices.getAlergiasList(req.query.Alergias);

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

    result.getOrientacionList =
      await beneficiarioServices.getOrientacionList(req.query.Orientacion);

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

    result.getRiesgosList =
      await beneficiarioServices.getRiesgosList(req.query.Riesgos);

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

    result.getSedeList =
      await beneficiarioServices.getSedeList(req.query.Sede);

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

    result.getDiagnosticoList =
      await beneficiarioServices.getDiagnosticoList(req.query.Diagnostico);

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
exports.getBeneficiarios= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    
    const page = req.query;

    const total_paginas =
      await beneficiarioServices.getBeneficiariosActuales();

    result.paginas = 
       (total_paginas.value)/10;

    result.cantidad = 
       total_paginas.value;
    
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
