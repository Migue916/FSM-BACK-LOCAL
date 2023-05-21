const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_EpsList = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EPS_LIST, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_EpsList;