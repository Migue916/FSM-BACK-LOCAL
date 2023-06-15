const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_CargosList = async (cargo) => {
    try {
        let result;
        if(cargo === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_CARGO_LIST);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_CARGO_LIST_BUSQUEDA, [cargo]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_CargosList;