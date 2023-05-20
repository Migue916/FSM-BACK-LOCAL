const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_diagnostico_principal = async (id_enfermedad) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIO_DIAGNOSTICO_PRINCIPAL, [id_enfermedad]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_diagnostico_principal;