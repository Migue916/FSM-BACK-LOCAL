const getOutPorYearQuery = "SELECT COUNT(*) FROM egreso WHERE DATE_TRUNC('year', fecha) = DATE_TRUNC('year', CURRENT_DATE)";

module.exports = { getOutPorYearQuery };