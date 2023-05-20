const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Alergias = async (alergia) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_ALERGIA, [alergia.id_beneficiario, alergia.id_alergia, alergia.id_empleado, alergia.observacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Alergias;