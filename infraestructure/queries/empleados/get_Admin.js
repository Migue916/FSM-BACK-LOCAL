const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Admin = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADMIN, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Admin;