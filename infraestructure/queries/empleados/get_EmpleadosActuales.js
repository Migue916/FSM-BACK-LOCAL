const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_EmpleadosActuales = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_ACTUALES, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_EmpleadosActuales;