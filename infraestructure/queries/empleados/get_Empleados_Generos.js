const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_Beneficiarios_Ultimo_Mes = async () => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.GET_EMPLEADOS_GENEROS, []);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = get_Beneficiarios_Ultimo_Mes;