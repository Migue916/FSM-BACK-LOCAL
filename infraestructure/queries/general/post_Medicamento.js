const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Medicamento = async (medicamento) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_MEDICAMENTO, [medicamento]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Medicamento;