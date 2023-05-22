const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Riesgos = async (riesgos) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_RIESGOS, [riesgos.id_beneficiario, riesgos.id_riesgo, riesgos.id_empleado, riesgos.observacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Riesgos;