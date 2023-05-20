const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Riesgos = async (riesgos) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_RIESGO, [riesgos]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Riesgos;