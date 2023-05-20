const getOutPorMesQuery = "SELECT COUNT(*) FROM egreso WHERE DATE_TRUNC('month', fecha) = DATE_TRUNC('month', CURRENT_DATE)";

module.exports = { getOutPorMesQuery };