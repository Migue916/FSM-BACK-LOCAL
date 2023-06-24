const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Riesgos = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_RIESGO, [diagnostico.id_riesgo, diagnostico.riesgo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Riesgos;