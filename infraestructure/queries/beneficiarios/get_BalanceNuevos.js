const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_BalanceNuevos = async (anio) => {
    try {
        const anioToInt = parseInt(anio.anio);
        const result = await pool.DBConnection.query(sqlQueries.GET_BALANCE_NUEVOS, [anioToInt]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = get_BalanceNuevos;