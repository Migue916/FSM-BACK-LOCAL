const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_anios_egr = async () => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ANIOS_EGR, []);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = get_anios_egr;