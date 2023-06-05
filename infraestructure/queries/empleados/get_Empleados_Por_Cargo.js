const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Empleados = async (info) => {
    try {
        var result = [];
        if(info.Identificador != undefined){
            result = await pool.DBConnection.query((sqlQueries.GET_EMPLEADO_CARGO_IDENTITY), [info.Identificador]);
        }else{
            result = await pool.DBConnection.query((sqlQueries.GET_EMPLEADO_CARGO), []);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Empleados;