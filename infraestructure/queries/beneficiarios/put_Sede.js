const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Sede = async (sede) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_SEDE, [sede.id_beneficiario, sede.id_sede_proxima]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Sede;