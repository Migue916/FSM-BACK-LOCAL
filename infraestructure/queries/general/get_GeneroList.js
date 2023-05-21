const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_GeneroList = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_GENERO_LIST, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_GeneroList;