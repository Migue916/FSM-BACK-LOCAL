const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const get_Tipo_Doc_List = async (tipoDoc) => {
    try{
        let result;
        if(tipoDoc === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_TIPO_DOC_LIST, []);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_TIPO_DOC_LIST_BUSQUEDA, [tipoDoc]);
        }
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Tipo_Doc_List;