
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Cargo = async (id) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_CARGO, [id]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Cargo;