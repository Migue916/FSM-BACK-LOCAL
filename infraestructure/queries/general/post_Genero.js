const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Genero = async (genero) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_GENERO, [genero]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Genero;