const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_OrientacionList = async (orientacion) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ORIENTACION_LIST, [orientacion]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_OrientacionList;