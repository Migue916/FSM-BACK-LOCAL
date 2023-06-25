const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const post_Adjuntos = async (consulta) => {
    try {
    const result = await pool.DBConnection.query(sqlQueries.POST_ADJUNTOS, [consulta.id_reporte, consulta.ruta, consulta.nombre, consulta.docType]);
    return result.rows;
      } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al insertar el beneficiario' });
    }
};
module.exports = post_Adjuntos;  