const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_EmpleadosModulos = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_MODULOS, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_EmpleadosModulos;