const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_tipos_diagnosticos = async (diag) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_TIPOS_DIAGNOSTICOS, [diag]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = get_tipos_diagnosticos;