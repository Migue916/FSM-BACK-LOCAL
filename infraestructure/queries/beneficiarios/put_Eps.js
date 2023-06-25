const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Eps = async (sede) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_EPS, [sede.id_beneficiario, sede.id_eps_proxima]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Eps;