const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const put_Empleado_Tipo_Admin = async (modulo) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_EMPLEADO_ISADMIN, [modulo.id_beneficiario, modulo.isAdmin]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Empleado_Tipo_Admin;