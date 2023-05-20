const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_alergias_list = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIO_ALERGIAS_LIST, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_alergias_list;