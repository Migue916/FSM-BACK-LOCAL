const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sql_general");

const create_user_account = async (empleado) => {
  try {
    const result = await pool.DBConnection.query(
      sqlQueries.CREATE_USER_ACCOUNT,
      [empleado.id, empleado.email, empleado.contrasena, empleado.cargo]
    );
    return true;
  } catch (err) {
    throw err;
  }
};
module.exports = create_user_account;
