const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Profesion = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_PROFESION, [diagnostico.id_profesion, diagnostico.profesion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Profesion;