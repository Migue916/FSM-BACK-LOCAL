const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_BuscaPorNombre = async (nombre) => {
    try {
        // Convierte el valor de nombre en string
        const nombreString = nombre.nombre.toString();
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_POR_NOMBRE, [nombreString]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_BuscaPorNombre;
