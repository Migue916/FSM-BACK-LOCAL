const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Eps = async (eps) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.POST_EPS, [eps]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Eps;