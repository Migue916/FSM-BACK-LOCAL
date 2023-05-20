
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Consultas = async (id) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_TOTAL_CONSULTAS, [id]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Consultas;