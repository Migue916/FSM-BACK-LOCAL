const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Empleados = async (page) => {
    try {
        var result = [];
        switch (true) {
            case (page.Identificador != undefined):
                result = await pool.DBConnection.query((sqlQueries.GET_EMPLEADO_IDENTITY), [page.Identificador]);
                break;
            default:
                result = await pool.DBConnection.query((sqlQueries.GET_EMPLEADO));
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Empleados;