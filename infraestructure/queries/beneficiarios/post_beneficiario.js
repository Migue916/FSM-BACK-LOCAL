const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_Beneficiarios");

const post_beneficiario = async (beneficiario) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.CREATE_BENEFICIARIO, [beneficiario.id, beneficiario.id_tipo_doc, beneficiario.p_nombre, beneficiario.s_nombre, beneficiario.p_apellido, beneficiario.s_apellido, beneficiario.id_sede, beneficiario.fecha_nacimiento, beneficiario.id_genero, beneficiario.id_orientacion, beneficiario.id_eps, beneficiario.id_psicologo, beneficiario.id_trabajador_social, beneficiario.estado]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.error});
  }
};
module.exports = post_beneficiario;   
