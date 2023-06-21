const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_OrientacionList = async (ID) => {
    try {
        let result;
        result = await pool.DBConnection.query(sqlQueries.GET_NOMBRE_BENEFICIARIO, [ID]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_OrientacionList;