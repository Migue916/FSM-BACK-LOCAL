const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_genero = async (id) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_GENERO, [id]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_genero;