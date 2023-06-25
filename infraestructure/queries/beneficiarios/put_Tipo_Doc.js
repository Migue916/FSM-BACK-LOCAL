const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Tipo_Doc = async (sede) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_TIPO_DOC, [sede.id_beneficiario, sede.id_TipoDoc_proximo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Tipo_Doc;