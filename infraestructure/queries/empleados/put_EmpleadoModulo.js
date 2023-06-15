const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_EmpleadoModulo = async (modulo) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_EMPLEADO_MODULO, [modulo.id_beneficiario, modulo.id_new_modulo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_EmpleadoModulo;