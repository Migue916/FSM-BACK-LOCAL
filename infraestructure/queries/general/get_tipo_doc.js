const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_tipo_doc = async (doc) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_TIPO_DOC, [doc]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_tipo_doc;