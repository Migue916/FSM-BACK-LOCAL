const response = require("./responses/response");
const empleadosServices = require("../infraestructure/services/empleados.services/empleados_service");
const beneficiarioServices = require("../infraestructure/services/beneficiarios.services/beneficiarios_service");
const e = require("express");


exports.getEmpleadosLastTen= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getEmpleados =
      await empleadosServices.getEmpleadosLastTen();
      
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

  exports.getNombre = async (req, res, next) => {
    try {
      const result = {
        status: true,
        message: "successful",
      };
      id = req.query.id;
      result.Saludo =
        await empleadosServices.nombreEmpleado(id);

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

exports.getStatisticsEmpleados = async (req, res, next) => {
    try {
      const result = {
        status: true,
        message: "successful",
      };
  
      result.empleados_actuales =
        await empleadosServices.getEmpleadosActuales();
      result.beneficiarios_egresados =
        await empleadosServices.getEmpleadosEgresados();
  
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

  exports.getStatisticsEmpleadosGenero = async (req, res, next) => {
    try {
      const result = {
        status: true,
        message: "successful",
      };
  
      result.empleados_genero =
        await empleadosServices.getEmpleadosGenero();
  
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

  exports.getStatisticsEmpleadosModulo = async (req, res, next) => {
    try {
      const result = {
        status: true,
        message: "successful",
      };
  
      result.empleados_modulo =
        await empleadosServices.getEmpleadosModulo();
  
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

  exports.getEmpleados = async (req, res, next) => {
        try {
          const result = {
            status: true,
            message: "successful",
          };
          const page = req.query;
      
          result.Total = (await (empleadosServices.getEmpleadosActuales())).value;

          result.empleados =
            await empleadosServices.getEmpleados(page);
      
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

  exports.getEmpleadosDownload = async (req, res, next) => {
    try {
      const result = {
        status: true,
        message: "successful",
      };
      const page = req.query;
  
      result.Total = (await (empleadosServices.getEmpleadosActuales())).value;

      result.empleados =
        await empleadosServices.getEmpleadosDownload(page);
  
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

  exports.getEmpleadosPorNombre = async (req, res, next) => {
    try {
      const result = {
        status: true,
        message: "successful",
      };
  
      const nombre = req.query;
      result.empleados =
        await empleadosServices.getEmpleadosPorNombre(nombre);
  
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

exports.getEmpleadosPorCargo = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    const info = req.query;

    result.getEmpleadosPorCargo =
      await empleadosServices.getEmpleadosPorCargo(info);

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
    
    result.getEmpleadosCargos =
      await empleadosServices.getEmpleadosCargos();
    result.getEmpleadosModulos =
      await empleadosServices.getEmpleadosModulos();
    result.getEmpleadosGeneros =
      await empleadosServices.getEmpleadosGeneros();
    
      
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
      await empleadosServices.getPerfil(req.query.Id);

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

exports.putEgresado= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const egreso = {
      id_persona: req.body.id_persona, 
      observacion: req.body.observacion,
      tipo_usuario: false,
    };

    result.postEgreso =
      await empleadosServices.putEgreso(egreso);

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
    const file = await empleadosServices.getFoto(id);

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
    response.error(req, res, result, 200, "error");
  }
};

exports.postFoto = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

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

exports.getModulosList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await empleadosServices.getModulosList(req.query.Search);

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

exports.getCargosList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await empleadosServices.getCargosList(req.query.Search);

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

exports.getProfesionList= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getList =
      await empleadosServices.getProfesionList(req.query.Search);

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

exports.putEmpleadoModulo = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const modulo = {
      id_empleado: req.body.id_empleado, 
      id_new_modulo: req.body.id_value 
    };

    const camposLlenos = Object.values(modulo).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putEmpleadoModulo = 
        await empleadosServices.putEmpleadoModulo(modulo);
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

exports.putEmpleadoCargo = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const cargo = {
      id_empleado: req.body.id_empleado, 
      id_new_cargo: req.body.id_value
    };

    const camposLlenos = Object.values(cargo).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putEmpleadoCargo = 
        await empleadosServices.putEmpleadoCargo(cargo);
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


exports.putEmpleadoProfesion = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const profesion = {
      id_empleado: req.body.id_empleado, 
      id_new_profesion: req.body.id_value
    };

    const camposLlenos = Object.values(profesion).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putEmpleadoProfesion = 
        await empleadosServices.putEmpleadoProfesion(profesion);
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


exports.putEmpleadoTipoAdmin = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const admin = {
      id_empleado: req.body.id_empleado, 
      isAdmin: req.body.value
    };

    const camposLlenos = Object.values(admin).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putEmpleadoTipoAdmin = 
        await empleadosServices.putEmpleadoTipoAdmin(admin);
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
      id_empleado: req.body.id_empleado,
      p_nombre: req.body.p_nombre, 
      s_nombre: req.body.s_nombre, 
      p_apellido: req.body.p_apellido,
      s_apellido: req.body.s_apellido,
      id_tipo_doc: req.body.id_tipo_doc
    };

    const camposLlenos = Object.values(info).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putInfo = 
        await empleadosServices.putInfo(info);
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

exports.getConsultas = async (req, res, next) => {
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
      await empleadosServices.getConsulta(list);

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

exports.getBeneficiariosUltimoMes= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getBeneficiariosListConsultas =
      await empleadosServices.getBeneficiariosUltimoMes(req.query.Id);
    
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

exports.getBeneficiariosACargo= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.getBeneficiariosACargo =
      await empleadosServices.getBeneficiariosACargo(req.query.Id);
    
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

exports.postModulo= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    modulo = req.body.value;
    if (modulo.length !== 0){
      result.postModulo = 
        await empleadosServices.postModulo(modulo);
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

exports.postCargo= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    cargo = req.body.value;
    if (cargo.length !== 0){
      result.postCargo = 
        await empleadosServices.postCargo(cargo);
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

exports.postProfesion= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };
    profesion = req.body.value;
    if (profesion.length !== 0){
      result.postProfesion = 
        await empleadosServices.postProfesion(profesion);
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



exports.putGeneralModulo= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const modulo = {
      id_modulo: req.body.id_value,
      modulo: req.body.value
    };

    const camposLlenos = Object.values(modulo).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralModulo = 
        await empleadosServices.putGeneralModulo(modulo);
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


exports.putGeneralCargo= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const cargo = {
      id_cargo: req.body.id_value,
      cargo: req.body.value
    };

    const camposLlenos = Object.values(cargo).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralCargo = 
        await empleadosServices.putGeneralCargo(cargo);
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


exports.putGeneralProfesion= async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const profesion = {
      id_profesion: req.body.id_value,
      profesion: req.body.value
    };

    const camposLlenos = Object.values(profesion).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putGeneralProfesion = 
        await empleadosServices.putGeneralProfesion(profesion);
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

exports.getIsAdmin = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    id = req.body.Id;
    result.isAdmin =
      await empleadosServices.isAdmin(id);

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