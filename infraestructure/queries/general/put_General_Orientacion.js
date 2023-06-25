const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Orientacion = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_ORIENTACION, [diagnostico.id_orientacion, diagnostico.orientacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Orientacion;