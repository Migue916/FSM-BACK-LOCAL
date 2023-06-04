const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_RiesgosList = async (riesgo) => {
    try {
        let result;
        if(riesgo === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_RIESGO_LIST);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_RIESGO_LIST_BUSQUEDA, [riesgo]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_RiesgosList;