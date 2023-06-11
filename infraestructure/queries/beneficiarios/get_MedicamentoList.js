const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const get_MedicamentoList = async (medicamento) => {
    try {
        let result;
        if(medicamento === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_MEDICAMENTO_LIST);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_MEDICAMENTO_LIST_BUSQUEDA, [medicamento]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_MedicamentoList;