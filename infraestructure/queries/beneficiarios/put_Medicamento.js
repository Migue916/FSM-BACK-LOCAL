const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Medicamento = async (medicamento) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_MEDICAMENTO, [medicamento.id_medicamento, medicamento.id_beneficiario, medicamento.id_empleado, medicamento.observacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Medicamento;