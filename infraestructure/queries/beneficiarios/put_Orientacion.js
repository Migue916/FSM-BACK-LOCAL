const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Orientacion = async (orientacion) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_ORIENTACION, [orientacion.id_beneficiario, orientacion.id_orientacion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Orientacion;