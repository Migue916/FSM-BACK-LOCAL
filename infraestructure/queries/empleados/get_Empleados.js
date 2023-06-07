const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Empleados = async (page) => {
    try {
        const pageF = (+page.page)*10;
        const pageI = pageF-10;
        var result = [];
        switch (true) {
            case (page.Identificador != undefined):
                result = await pool.DBConnection.query((sqlQueries.GET_EMPLEADO_IDENTITY), [pageI, pageF, page.Identificador]);
                break;
            case (page.EdadIn != undefined && page.EdadFn != undefined):
                result = await pool.DBConnection.query((sqlQueries.GET_EMPLEADO_EDAD_FILTER), [pageI, pageF, page.EdadIn, page.EdadFn]);
                break;
            default:
                result = await pool.DBConnection.query((sqlQueries.GET_EMPLEADO), [pageI, pageF]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Empleados;