const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_Adjuntos = async (consulta) => {
    try {
    const result = await pool.DBConnection.query(sqlQueries.PUT_ADJUNTOS, [consulta.id_consulta, consulta.rutaNew]);
    return result.rows;
      } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al insertar la consulta' });
    }
};
module.exports = put_Adjuntos;  