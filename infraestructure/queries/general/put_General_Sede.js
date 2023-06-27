const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Sede = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_SEDE, [diagnostico.id_sede, diagnostico.sede, diagnostico.direccion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Sede;