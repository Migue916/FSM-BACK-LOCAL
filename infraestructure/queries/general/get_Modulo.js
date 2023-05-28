const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_Modulo = async (id_modulo) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_MODULO, [id_modulo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Modulo;