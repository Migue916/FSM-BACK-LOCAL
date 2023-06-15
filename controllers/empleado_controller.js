const response = require("./responses/response");
const empleadosServices = require("../infraestructure/services/empleados.services/empleados_service");

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
          const total_paginas =
            await empleadosServices.getEmpleadosActuales();
      
          result.paginas = (total_paginas.value)/10;

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
    response.error(req, res, result, 400, "error");
  }
};

exports.postFoto = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    result.postFoto = 
      await empleadosServices.postFoto(req);
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

    result.getModulosList =
      await empleadosServices.getModulosList(req.query.Modulo);

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

    result.getCargosList =
      await empleadosServices.getCargosList(req.query.Cargo);

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

    result.getProfesionList =
      await empleadosServices.getProfesionList(req.query.Profesion);

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
      id_new_modulo: req.body.id_new_modulo
    };

    const camposLlenos = Object.values(sede).every((value) => value !== undefined && value !== '');
    
    if (camposLlenos){
      result.putEmpleadoModulo = 
        await beneficiarioServices.putEmpleadoModulo(modulo);
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