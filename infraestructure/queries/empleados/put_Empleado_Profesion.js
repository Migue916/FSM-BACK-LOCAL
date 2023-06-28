const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const put_Empleado_Profesion = async (modulo) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_EMPLEADO_PROFESION, [modulo.id_beneficiario, modulo.id_new_profesion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Empleado_Profesion;