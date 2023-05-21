
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_EmpleadosModulo = async (id) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_NOMBRE, [id]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_EmpleadosModulo;