const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_Beneficiarios_Riesgos = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_RIESGO, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Beneficiarios_Riesgos;