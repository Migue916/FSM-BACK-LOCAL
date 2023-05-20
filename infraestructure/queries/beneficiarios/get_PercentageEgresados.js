const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_PercentageEgresados = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_PERCENTAGE_OUT_MONTH, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_PercentageEgresados;