const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Modulo = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_MODULO, [diagnostico.id_modulo, diagnostico.modulo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Modulo;