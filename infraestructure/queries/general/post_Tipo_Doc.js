const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Tipo_Doc = async (sedes) => {
    try{
        const tipoDoc = sedes.tipoDoc; 
        const abreviacion = sedes.abreviacion;
        const result = await pool.DBConnection.query(sqlQueries.POST_TIPO_DOC, [tipoDoc, abreviacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Tipo_Doc;