const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const put_EmpleadoCargo = async (modulo) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_EMPLEADO_CARGO, [modulo.id_beneficiario, modulo.id_new_cargo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_EmpleadoCargo;