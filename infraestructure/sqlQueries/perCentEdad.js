const getPerCentEdadQuery = "SELECT CASE WHEN edad < 18 THEN 'Menor de 18' WHEN edad BETWEEN 18 AND 30 THEN 'Entre 18 y 30' WHEN edad BETWEEN 31 AND 50 THEN 'Entre 31 y 50' ELSE 'Mayor de 50' END AS rango_edad, COUNT(*)*100.0/(SELECT COUNT(*) FROM beneficiario) AS porcentaje FROM ( SELECT id, fecha_nacimiento, DATE_PART('year', age(fecha_nacimiento)) AS edad FROM beneficiario ) AS edades GROUP BY rango_edad;"

module.exports = { getPerCentEdadQuery };

