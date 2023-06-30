const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Modulo = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_MODULO, [diagnostico]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Modulo;