const queries_Empleados = require("../../queries/empleados/empleados_QueriesModule");
const queries_General = require("../../queries/general/general_QueriesModule");

exports.getEmpleadosPorCargo = async (info) => {
  try { 
    
    const getEmpleados = await queries_Empleados.get_Empleados_Por_Cargo(info);
    const results = [];

    for (const row of getEmpleados) { 

      const cargo = await queries_Empleados.get_Cargo(row.id_cargo);
      const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);

      const result = {
        Nombre: row.p_nombre + " " +
                row.s_nombre + " " +
                row.p_apellido + " " +
                row.s_apellido,

        Identificacion: row.id,
        Cargo: cargo[0].cargo,
        Modulo: modulo[0].modulo,
      };
      results.push(result);
    }
    var filtredData = results;

    if (info.Cargo !== undefined){
      filtredData = filtredData.filter(filtredData => filtredData.Cargo === info.Cargo);
    }
    if (info.Modulo !== undefined){
      filtredData = filtredData.filter(filtredData => filtredData.Modulo === info.Modulo);
    }

    return filtredData;
  } catch (error) {
    throw error;
  }
};


exports.getEmpleadosLastTen = async () => {
  try { 
    
    const getEmpleadosLastTen = await queries_Empleados.get_Empleados_LastTen();
    const results = [];

    for (const row of getEmpleadosLastTen) { 

      const consultas = await queries_Empleados.get_Consultas(row.id);
      const cargo = await queries_Empleados.get_Cargo(row.id_cargo);
      const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);

      if (consultas.length === 0){
        consultas.push(
          {
            cant:"0"
          }
        )
    }

      const result = {
        Nombre: row.p_nombre + " " +
                row.s_nombre + " " +
                row.p_apellido + " " +
                row.s_apellido,

        Identificacion: row.id,
        Edad: row.edad,
        Consultas_realizadas: consultas[0].cant,
        Cargo: cargo[0].cargo,
        Modulo: modulo[0].modulo,
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getEmpleados = async (page) => {
  try { 
    
    const getEmpleados = await queries_Empleados.get_Empleados(page);
    const results = [];

    for (const row of getEmpleados) { 

      const consultas = await queries_Empleados.get_Consultas(row.id);
      const cargo = await queries_Empleados.get_Cargo(row.id_cargo);
      const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);

      if (consultas.length === 0){
        consultas.push(
          {
            cant:"0"
          }
        )
    }

      const result = {
        Nombre: row.p_nombre + " " +
                row.s_nombre + " " +
                row.p_apellido + " " +
                row.s_apellido,

        Identificacion: row.id,
        Edad: row.edad,
        Consultas_realizadas: consultas[0].cant,
        Cargo: cargo[0].cargo,
        Modulo: modulo[0].modulo,
      };
      results.push(result);
    }
    var filtredData = results;

    if (page.Cargo !== undefined){
      filtredData = filtredData.filter(empleado => empleado.Cargo === page.Cargo);
    }
    if (page.Modulo !== undefined){
      filtredData = filtredData.filter(empleado => empleado.Modulo === page.Modulo);
    }
    if (page.ConsultasIn !== undefined && page.ConsultasFn !== undefined) {
      filtredData = filtredData.filter(empleado => 
        empleado.Consultas_realizadas >= page.ConsultasIn && empleado.Consultas_realizadas <= page.ConsultasFn
      );
    }
    return filtredData;
  } catch (error) {
    throw error;
  }
};


exports.nombreEmpleado = async(id) =>{
  try { 

    const nombreEmpleado = await queries_Empleados.get_nombre(id);
    const cargo = await queries_Empleados.get_Cargo(nombreEmpleado[0].id_cargo);

    const result = {
      id: id.id,
      Nombre: nombreEmpleado[0].p_nombre + " " + nombreEmpleado[0].s_nombre,
      Apellido: nombreEmpleado[0].p_apellido + " " + nombreEmpleado[0].s_apellido,
      Cargo: cargo[0].cargo
    };
    
    return result;
} catch (error) {
  throw error;
}
};

exports.getEmpleadosPorNombre = async (nombre) => {
  try {

      getEmpleado = await queries_Empleados.get_EmpleadosPorNombre(nombre);
      const results = [];

    for (const row of getEmpleado) {

      const cant = await queries_Empleados.get_Consultas(row.id);
      const cargo = await queries_Empleados.get_Cargo(row.id_cargo);
      const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);

      if (cant.length === 0){
          cant.push(
            {
              cant:"0"
            }
          )
      }
      const result = {
        Empleado: row.p_nombre + " " +
                  row.s_nombre + " " +
                  row.p_apellido + " " +
                  row.s_apellido,
        Identificacion: row.id,
        Cargo: cargo[0].cargo,
        Modulo: modulo[0].modulo,
        Consultas: cant[0].cant,
      };
      
      results.push(result);

      };
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getEmpleadosModulo = async () => {
    try {
      
      const estadistica = 
        await queries_Empleados.get_EmpleadosModulo();

        const results = [];

      for (const row of estadistica) {
        const id_modulo = row.pertenencia_de_modulo;
        const cant = row.cant;

        const modulo = await queries_General.get_Modulo(id_modulo);

        const result = {
          modulo: modulo[0].modulo,
          cantidad: cant,
            };
        
        results.push(result);

        };
      return results;
    } catch (error) {
      throw error;
    }
  };

exports.getEmpleadosGenero = async () => {
    try {
      // Segunda forma si va a hacer los calculos desde javascript
      
      const estadistica = 
        await queries_Empleados.get_EmpleadosGeneros();

      const Masculino = +estadistica[0].masculino;
      const Femenino = +estadistica[0].femenino;
        
      const result = {
        Masculino: Masculino,
        Femenino: Femenino, 
        Total: Masculino + Femenino
      };
      return result;
    } catch (error) {
      throw error;
    }
  };

exports.getEmpleadosActuales = async () => {
    try {
      // Segunda forma si va a hacer los calculos desde javascript
      const actual =
        await queries_Empleados.get_EmpleadosActuales();
      const pasado =
        await queries_Empleados.get_EmpleadosActualesPasado();

      let porcentaje = 100;
      if(pasado.length !== 0){
        porcentaje = (100 / (+pasado[0].count)) * ((+actual[0].count) - (+pasado[0].count));
      }
  
      const result = {
        value: +actual[0].count,
        percentage: porcentaje
      };
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  exports.getEmpleadosEgresados = async () => {
    try {
      const actual =
        await queries_Empleados.get_EmpleadosEgresados();
      const pasado =
        await queries_Empleados.get_EmpleadosEgresadosPasado();
        
      let porcentaje = 100;
      if(pasado.length !== 0){
        porcentaje = (100 / (+pasado[0].count)) * ((+actual[0].count) - (+pasado[0].count));
      }
        const result = {
          value: +actual[0].count,
          percentage: porcentaje
        };
      return result;
    } catch (error) {
      throw error;
    }
  };

  exports.getEmpleadosCargos = async () => {
    try { 
      const getEmpleadosCargos = await queries_Empleados.get_EmpleadosCargos();
        const results = [];
          for (const row of getEmpleadosCargos) { 
            const cargo = await queries_Empleados.get_Cargo(row.id_cargo);  
            const result = {
              cargos: cargo[0].cargo,
            };
            results.push(result);
          }
          return results;
  } catch (error) {
    throw error;
  }
  };

  exports.getEmpleadosModulos = async () => {
    try { 
      const getEmpleadosModulos = await queries_Empleados.get_EmpleadosModulos();
        const results = [];
          for (const row of getEmpleadosModulos) { 
            const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);
            const result = {
              modulos: modulo[0].modulo,
            };
            results.push(result);
          }
          return results;
  } catch (error) {
    throw error;
  }
  };

  
exports.getPerfil = async (id) => {
  try { 
    const getPerfil = await queries_Empleados.get_Perfil(id);
      const results = [];

      const consultas = await queries_Empleados.get_Consultas(id);
      const cargo = await queries_Empleados.get_Cargo(getPerfil[0].id_cargo);
      const modulo = await queries_General.get_Modulo(getPerfil[0].pertenencia_de_modulo);

      if (consultas.length === 0){
        consultas.push(
          {
            cant:"0"
          }
        )
      }
      const result = {
          Nombre: getPerfil[0].p_nombre + " " + getPerfil[0].s_nombre,
          Apellido: getPerfil[0].p_apellido + " " + getPerfil[0].s_apellido,
          Identificacion: getPerfil[0].id,
          Fecha_nacimiento: getPerfil[0].fecha_nacimiento,
          Edad: getPerfil[0].edad,
          Fecha_ingreso: getPerfil[0].fecha_ingreso, 
          Num_consultas: consultas[0].cant,
          Cargo: cargo[0].cargo, 
          Modulo: modulo[0].modulo
        };   
        results.push(result);
        return results;
} catch (error) {
  throw error;
}
};