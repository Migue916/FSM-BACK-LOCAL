const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_GeneroList = async (genero) => {
    try{
        let result;
        if(genero === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_GENERO_LIST, []);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_GENERO_LIST_BUSQUEDA, [genero]);
        }
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_GeneroList;