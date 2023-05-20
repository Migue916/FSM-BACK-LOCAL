const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_SedeList = async (sede) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_SEDE_LIST, [sede]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_SedeList;