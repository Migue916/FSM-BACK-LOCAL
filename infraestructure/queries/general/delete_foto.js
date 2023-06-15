const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const delete_foto = async (foto) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.DELETE_FOTO, [foto.id]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = delete_foto;