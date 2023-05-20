const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const getBeneficiariosActuales = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_ACTUALES, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = getBeneficiariosActuales;