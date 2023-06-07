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
    result.Nombre =
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