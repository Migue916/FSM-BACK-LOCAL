const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_RiesgosList = async (riesgo) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_RIESGO_LIST, [riesgo]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_RiesgosList;