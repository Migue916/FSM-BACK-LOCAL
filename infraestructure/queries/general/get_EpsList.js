const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_EpsList = async (eps) => {
    try{
        let result;
        if(eps === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_EPS_LIST, []);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_EPS_LIST_BUSQUEDA, [eps]);
        }
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_EpsList;