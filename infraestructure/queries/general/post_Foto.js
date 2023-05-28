const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Foto = async (foto) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_FOTO, [foto.id_persona, foto.ruta]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Foto;