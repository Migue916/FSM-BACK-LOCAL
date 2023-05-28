const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_Foto = async (id) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_FOTO, [id]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Foto;