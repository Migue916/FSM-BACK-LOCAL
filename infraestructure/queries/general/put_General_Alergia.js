const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Alergia = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_ALERGIA, [diagnostico.id_alergia, diagnostico.alergia]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Alergia;