const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_profesion = async (sede) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_PROFESION, [sede]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_profesion;