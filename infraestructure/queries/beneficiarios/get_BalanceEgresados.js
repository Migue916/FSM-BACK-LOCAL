const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_BalanceEgresados = async (anio) => {
    try {
        const anioToInt = parseInt(anio.anio);
        const result = await pool.DBConnection.query(sqlQueries.GET_BALANCE_EGRESADOS, [anioToInt]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = get_BalanceEgresados;