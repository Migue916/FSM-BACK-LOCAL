const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_Consultas_url = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIO_CONSULTA_URL, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Consultas_url;