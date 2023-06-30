const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Cargo = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_CARGO, [diagnostico.id_cargo, diagnostico.cargo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Cargo;