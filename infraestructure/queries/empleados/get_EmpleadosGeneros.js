
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_EmpleadosGeneros = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_POR_GENERO, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_EmpleadosGeneros;