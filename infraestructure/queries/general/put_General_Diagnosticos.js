const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Diagnosticos = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_DIAGNOSTICO, [diagnostico.id_diagnostico, diagnostico.diagnostico]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Diagnosticos;