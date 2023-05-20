const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Diagnostico = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_DIAGNOSTICO, [diagnostico.id_enfermedad, diagnostico.id_beneficiario, diagnostico.id_empleado, diagnostico.tipo, diagnostico.observacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Diagnostico;