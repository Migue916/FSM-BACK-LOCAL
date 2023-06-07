const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_Beneficiarios = async (page) => {
    try {
        const pageF = (+page.page)*10;
        const pageI = pageF-10;
        var result = [];
        switch (true) {
            case (page.Identificador !== undefined):
              result = await pool.DBConnection.query((sqlQueries.GET_BENEFICIARIO_IDENTITY), [pageI, pageF, page.Identificador]);
              break;
            case (page.EdadIn !== undefined && page.EdadFn !== undefined):
              result = await pool.DBConnection.query((sqlQueries.GET_BENEFICIARIO_EDAD_FILTER), [pageI, pageF, page.EdadIn, page.EdadFn]);
              break;
            case (page.FecIn !== undefined && page.FecFn !== undefined):
              result = await pool.DBConnection.query((sqlQueries.GET_BENEFICIARIO_FECHA_FILTER), [pageI, pageF, page.FecIn, page.FecFn]);
              break;
            default:
              result = await pool.DBConnection.query((sqlQueries.GET_BENEFICIARIO), [pageI, pageF]);
          }          
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_Beneficiarios;