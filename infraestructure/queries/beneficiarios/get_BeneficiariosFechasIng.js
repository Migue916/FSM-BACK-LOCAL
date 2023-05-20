const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_BeneficiariosFechasIng = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_FECHAS_INGRESO, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_BeneficiariosFechasIng;