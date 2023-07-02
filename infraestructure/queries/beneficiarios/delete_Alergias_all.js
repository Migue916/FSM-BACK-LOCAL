
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const delete_Alergias_all = async (alergia) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ALERGIAS_ALL , [alergia]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = delete_Alergias_all;