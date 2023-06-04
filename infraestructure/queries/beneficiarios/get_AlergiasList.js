const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_AlergiasList = async (alergias) => {
    try {
        let result;
        if(alergias === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_ALERGIAS_LIST);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_ALERGIAS_LIST_BUSQUEDA, [alergias]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_AlergiasList;