const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_BeneficiariosEdades = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_EDADES, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_BeneficiariosEdades;