const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_consulta = async (consulta) => {
    try {
    const result = await pool.DBConnection.query(sqlQueries.PUT_CONSULTA, [consulta.id_consulta, consulta.id_empleado, consulta.rutaNew, consulta.docType, consulta.nombre]);
    return result.rows;
      } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al insertar la consulta' });
    }
};
module.exports = put_consulta;  