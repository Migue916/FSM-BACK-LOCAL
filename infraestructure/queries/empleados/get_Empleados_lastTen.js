
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Empleados = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_ULTIMOS_DIEZ, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Empleados;