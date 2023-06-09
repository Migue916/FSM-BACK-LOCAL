const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_Diagnosticos = async () => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_DIAGNOSTICOS, []);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = get_Diagnosticos;