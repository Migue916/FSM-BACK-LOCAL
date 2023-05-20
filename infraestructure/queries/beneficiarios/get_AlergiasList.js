const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_AlergiasList = async (alergias) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ALERGIAS_LIST, [alergias]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_AlergiasList;