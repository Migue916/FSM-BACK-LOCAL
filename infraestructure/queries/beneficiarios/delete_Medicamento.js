const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const delete_Medicamento = async (medicamento) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.DELETE_MEDICAMENTO, [medicamento.id_beneficiario, medicamento.id_medicamento]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = delete_Medicamento;