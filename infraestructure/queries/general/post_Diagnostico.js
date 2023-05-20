const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Diagnostico = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_DIAGNOSTICO, [diagnostico]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Diagnostico;