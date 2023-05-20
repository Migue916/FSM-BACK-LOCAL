const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_diagnosticos_secundarios = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIO_DIAGNOSTICOS_SECUNDARIOS, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_diagnosticos_secundarios;