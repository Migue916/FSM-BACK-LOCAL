const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_Consultas = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIO_ULTIMA_CONSULTA, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Consultas;