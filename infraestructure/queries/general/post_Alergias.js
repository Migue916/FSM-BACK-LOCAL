const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Alergias = async (alergia) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_ALERGIA, [alergia]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Alergias;