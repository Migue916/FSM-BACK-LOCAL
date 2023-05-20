const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_anios = async () => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ANIOS, []);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = get_anios;