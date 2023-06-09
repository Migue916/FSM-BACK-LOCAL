const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const put_EmpleadoModulo = async (modulo) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_EMPLEADO_MODULO, [modulo.id_empleado, modulo.id_new_modulo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_EmpleadoModulo;