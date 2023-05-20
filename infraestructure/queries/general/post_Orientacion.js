const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Orientacion = async (orientacion) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_ORIENTACION, [orientacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Orientacion;