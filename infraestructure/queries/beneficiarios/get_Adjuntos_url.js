const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_Adjuntos_url = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIO_ADJUNTOS_URL, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Adjuntos_url;