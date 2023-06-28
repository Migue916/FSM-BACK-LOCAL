const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_DiagnosticoList = async (diagnostico) => {
    try {
        let result;
        console.log(diagnostico);
        if(diagnostico === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_DIAGNOSTICOS_LIST);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_DIAGNOSTICOS_LIST_BUSQUEDA, [diagnostico]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_DiagnosticoList;