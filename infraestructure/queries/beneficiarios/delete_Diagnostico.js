const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const delete_Diagnostico = async (Diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.DELETE_DIAGNOSTICO, [Diagnostico.id_beneficiario, Diagnostico.id_diagnostico]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = delete_Diagnostico;