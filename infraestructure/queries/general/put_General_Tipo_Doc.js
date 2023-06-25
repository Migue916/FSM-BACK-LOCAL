const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Tipo_Doc = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_TIPO_DOC, [diagnostico.id_tipo_doc, diagnostico.tipo_doc, diagnostico.abreviacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Tipo_Doc;