
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const delete_Medicamento_all = async (alergia) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.DELETE_MEDICAMENTO_ALL , [alergia]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = delete_Medicamento_all;