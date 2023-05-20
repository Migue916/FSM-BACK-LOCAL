const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const post_Sede = async (sedes) => {
    try{
        const sede = sedes.sede; 
        const direccion = sedes.direccion;
        const result = await pool.DBConnection.query(sqlQueries.POST_SEDE, [sede, direccion]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = post_Sede;