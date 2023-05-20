const getInPorYearQuery = "SELECT DATE_TRUNC('year', fecha_ingreso) AS mes, COUNT(*) AS ingresados FROM beneficiario WHERE estado = true GROUP BY mes ORDER BY mes;";

module.exports = { getInPorYearQuery };