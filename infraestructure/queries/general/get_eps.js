const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_eps = async (id_eps) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EPS, [id_eps]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_eps;