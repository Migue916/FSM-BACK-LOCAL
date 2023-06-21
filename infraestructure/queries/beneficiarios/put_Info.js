const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Info = async (info) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_INFO, [info.id_beneficiario, info.p_nombre, info.s_nombre, info.p_apellido, info.s_apellido, info.id_tipo_doc]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = put_Info;