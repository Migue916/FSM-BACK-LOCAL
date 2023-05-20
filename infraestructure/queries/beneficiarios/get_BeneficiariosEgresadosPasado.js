const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_BeneficiariosEgresadosPasado = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_EGRESADOS_PASADO, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_BeneficiariosEgresadosPasado;