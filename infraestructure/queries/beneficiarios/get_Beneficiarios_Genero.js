const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_Beneficiarios_Genero = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_BENEFICIARIOS_GENERO, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Beneficiarios_Genero;