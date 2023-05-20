const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const put_beneficiario = async (beneficiario) => {
    try {
    const result = await pool.DBConnection.query(sqlQueries.PUT_ESTADO_BENEFICIARIO, [beneficiario.id_persona]);
    return result.rows;
      } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al insertar el beneficiario' });
    }
};
module.exports = put_beneficiario;  