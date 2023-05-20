const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_EmpleadosPorNombre = async (nombre) => {
    try {
        const nombreString = nombre.nombre.toString();
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_POR_NOMBRE, [nombreString]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_EmpleadosPorNombre;