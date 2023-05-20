const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_user = async (user) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_USER, [user]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_user;