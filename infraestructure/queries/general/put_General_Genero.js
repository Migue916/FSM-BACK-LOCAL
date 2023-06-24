const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Genero = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_EPS, [diagnostico.id_genero, diagnostico.genero]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Genero;