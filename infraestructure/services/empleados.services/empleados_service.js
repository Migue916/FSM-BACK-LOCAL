const queries_Empleados = require("../../queries/empleados/empleados_QueriesModule");
const queries_General = require("../../queries/general/general_QueriesModule");


exports.nombreEmpleado = async(id) =>{
  try { 

    const nombreEmpleado = await queries_Empleados.get_nombre(id);
    const cargo = await queries_Empleados.get_Cargo(nombreEmpleado[0].id_cargo);

    const result = {
      id: id,
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

exports.getEmpleados = async () => {
    try {

        getEmpleado = await queries_Empleados.get_Empleados();

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
      const porcentaje = (100/(+pasado[0].count))*((+actual[0].count) - (+pasado[0].count));
  
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
        const porcentaje = (100/(+pasado[0].count))*((+actual[0].count) - (+pasado[0].count));
  
        const result = {
          value: +actual[0].count,
          percentage: porcentaje
        };
      return result;
    } catch (error) {
      throw error;
    }
  };