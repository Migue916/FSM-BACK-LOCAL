const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_ModulosList = async (modulo) => {
    try {
        let result;
        if(modulo === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_MODULO_LIST);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_MODULO_LIST_BUSQUEDA, [modulo]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_ModulosList;