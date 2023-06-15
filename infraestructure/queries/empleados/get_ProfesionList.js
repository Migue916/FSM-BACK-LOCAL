const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Empleados");

const get_ProfesionList = async (profesion) => {
    try {
        let result;
        if(profesion === undefined){
            result = await pool.DBConnection.query(sqlQueries.GET_PROFESION_LIST);
        }else{
            result = await pool.DBConnection.query(sqlQueries.GET_PROFESION_LIST_BUSQUEDA, [profesion]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = get_ProfesionList;