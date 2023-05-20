const getInPorMesQuery = "SELECT DATE_TRUNC('month', fecha_ingreso) AS mes, COUNT(*) AS ingresados FROM beneficiario WHERE estado = true GROUP BY mes ORDER BY mes;";

module.exports = { getInPorMesQuery };