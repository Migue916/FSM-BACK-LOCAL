const getPerCentDignosticoQuery = "SELECT enfermedades.enfermedad, (COUNT(enfermedad_rel_beneficiario.id_enfermedad)*100.0)/(SELECT COUNT(*) FROM enfermedad_rel_beneficiario) AS porcentaje" +
                                " FROM enfermedades" +
                                " INNER JOIN enfermedad_rel_beneficiario ON enfermedades.id = enfermedad_rel_beneficiario.id_enfermedad" +
                                " GROUP BY enfermedades.enfermedad;"

module.exports = { getPerCentDignosticoQuery };