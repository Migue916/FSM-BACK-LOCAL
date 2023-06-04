const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_SedeList = async (sede) => {
    try {
        let result;
        if(sede === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_SEDE_LIST);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_SEDE_LIST_BUSQUEDA, [sede]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_SedeList;