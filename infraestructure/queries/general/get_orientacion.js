const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_orientacion = async (orientacion) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_ORIENTACION, [orientacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_orientacion;