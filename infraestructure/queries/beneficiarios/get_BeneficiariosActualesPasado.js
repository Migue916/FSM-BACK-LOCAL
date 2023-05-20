const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_BeneficiariosActualesPasado = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_ACTUALES_PASADO, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_BeneficiariosActualesPasado;