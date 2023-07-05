const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_consultas_LastTen = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_CONSULTAS_LAST_TEN, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_consultas_LastTen;