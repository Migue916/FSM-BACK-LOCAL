const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const new_Password = async (employee) => {
    try{
        const result = await pool.DBConnection.query(sqlQueries.PUT_CONTRASENA, [employee.email, employee.contrasena]);
        return result.rows;
    } catch(error){
        throw error;
    };
};
module.exports = new_Password;