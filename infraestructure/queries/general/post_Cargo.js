const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Cargo = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_CARGO, [diagnostico]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Cargo;