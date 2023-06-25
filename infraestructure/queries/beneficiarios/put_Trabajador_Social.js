const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Trabajador_Social = async (sede) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_TRABAJADOR_SOCIAL, [sede.id_beneficiario, sede.id_trabajador_social]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Trabajador_Social;