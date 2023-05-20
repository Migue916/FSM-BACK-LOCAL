const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_EstEdad = async () => {
    try {
        console.log('query');
        const result = await pool.DBConnection.query(sqlQueries.GET_ESTADISTICA_POR_EDAD, []);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = get_EstEdad;