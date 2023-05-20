const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const delete_Riesgos = async (riesgos) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.DELETE_RIESGOS, [riesgos.id_beneficiario, riesgos.id_riesgo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = delete_Riesgos;