const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_DiagnosticoList = async (diagnostico) => {
    try {
        let result;
        if(diagnostico != undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_DIAGNOSTICOS_LIST_BUSQUEDA, [diagnostico]);
        }
        result = await pool.DBConnection.query(sqlQueries.GET_DIAGNOSTICOS_LIST);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_DiagnosticoList;