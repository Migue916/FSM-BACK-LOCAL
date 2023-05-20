const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_EmpleadosEgresados = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_EGRESADOS, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_EmpleadosEgresados;