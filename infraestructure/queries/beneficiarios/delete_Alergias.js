const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const delete_Alergias = async (alergia) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ALERGIA , [alergia.id_beneficiario, alergia.id_alergia, alergia.id_empleado]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = delete_Alergias;