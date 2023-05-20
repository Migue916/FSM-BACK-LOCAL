const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const delete_Diagnostico = async (Diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.DELETE_DIAGNOSTICO, [Diagnostico.id_beneficiario, Diagnostico.id_diagnostico, Diagnostico.id_empleado]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = delete_Diagnostico;