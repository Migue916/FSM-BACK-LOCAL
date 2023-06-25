const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Psicologo = async (sede) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_PSICOLOGO, [sede.id_beneficiario, sede.id_psicologo]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Psicologo;