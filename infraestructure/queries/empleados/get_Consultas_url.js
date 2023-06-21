const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Consultas_url = async (list) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_CONSULTA_URL, [list.id, list.isFormat]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Consultas_url;