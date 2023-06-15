const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_Consultas_url = async (list) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIO_CONSULTA_URL, [list.id, list.isFormat]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Consultas_url;