const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const put_General_Eps = async (diagnostico) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_EPS, [diagnostico.id_eps, diagnostico.eps]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_General_Eps;