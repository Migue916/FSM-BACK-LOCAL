const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const create_user = async (empleado) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.CREATE_USER,[empleado.id, empleado.id_tipo_doc, empleado.p_nombre, empleado.s_nombre, empleado.p_apellido, empleado.s_apellido, empleado.id_profesion, empleado.tarjeta_profesional, empleado.id_cargo, empleado.activo, empleado.id_genero, empleado.pertenencia_de_modulo, empleado.fecha_nacimiento]);
    return true;
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al insertar el empleado' });
  }
};
module.exports = create_user;   