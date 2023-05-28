const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const post_consulta = async (consulta) => {
    try {
    const result = await pool.DBConnection.query(sqlQueries.POST_CONSULTA, [consulta.id_empleado, consulta.id_beneficiario, consulta.id_modulo, consulta.ruta]);
    return result.rows;
      } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al insertar el beneficiario' });
    }
};
module.exports = post_consulta;  