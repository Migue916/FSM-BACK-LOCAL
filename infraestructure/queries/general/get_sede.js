const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_sede = async (sede) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_SEDE, [sede]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_sede;