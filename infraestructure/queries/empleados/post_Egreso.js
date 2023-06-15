const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const post_egreso = async (beneficiario) => {
    try {
    const result = await pool.DBConnection.query(sqlQueries.POST_EGRESO, [beneficiario.id_persona, beneficiario.observacion, beneficiario.tipo_usuario]);
    return result.rows;
      } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al insertar el beneficiario' });
    }
};
module.exports = post_egreso;  