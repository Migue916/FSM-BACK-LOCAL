
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_EmpleadosModulo = async (id) => {
    try{
        const idEmpleado = parseInt(id.id);
        const result = await pool.DBConnection.query(sqlQueries.GET_NOMBRE, [idEmpleado]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_EmpleadosModulo;