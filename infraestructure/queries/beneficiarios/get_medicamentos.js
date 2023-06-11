const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_medicamentos = async (id) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_MEDICAMENTO, [id]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_medicamentos;