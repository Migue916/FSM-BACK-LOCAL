const sqlQueries = {

    GET_NOMBRE: 
        "SEKECT * FROM EMPLEADO WHERE id = $\1",

    GET_EMPLEADOS_EGRESADOS:
        "SELECT COUNT(*) FROM egreso WHERE TIPO_USUARIO = FALSE;",
    
    GET_EMPLEADOS_EGRESADOS_PASADO:
        "SELECT COUNT(*) FROM egreso WHERE EXTRACT(MONTH FROM fecha) != EXTRACT(MONTH FROM CURRENT_DATE) AND TIPO_USUARIO = FALSE;",

    GET_EMPLEADOS_ACTUALES:
        "SELECT COUNT(*) FROM empleado WHERE activo = true;",

    GET_EMPLEADOS_ACTUALES_PASADO:
        "SELECT COUNT(*) FROM empleado WHERE activo = true AND EXTRACT(MONTH FROM fecha_ingreso) != EXTRACT(MONTH FROM CURRENT_DATE);",
    
    GET_EMPLEADOS_POR_GENERO:
        "SELECT COUNT(CASE WHEN ID_GENERO = 1 THEN 1 END) AS MASCULINO, COUNT(CASE WHEN ID_GENERO = 2 THEN 1 END) AS FEMENINO FROM EMPLEADO WHERE ACTIVO = TRUE;",

    GET_EMPLEADOS_POR_MODULO:
        "SELECT pertenencia_de_modulo, count(pertenencia_de_modulo) as cant FROM empleado group by pertenencia_de_modulo",

    GET_EMPLEADOS_ULTIMOS_DIEZ:
        "SELECT * FROM empleado WHERE activo = TRUE ORDER BY fecha_ingreso DESC LIMIT 10",
    
    GET_EMPLEADOS_TOTAL_CONSULTAS:
        "select count(id_empleado) AS cant from reporte_modulo WHERE id_empleado = \$1 group by id_empleado",
    
    GET_EMPLEADOS_CARGO:
        "SELECT cargo FROM cargo WHERE id = \$1;",
    
    GET_EMPLEADOS_POR_NOMBRE:
        "SELECT * FROM ( SELECT *, SIMILARITY(CONCAT(p_nombre,' ', s_nombre,' ', p_apellido,' ', s_apellido), \$1) AS similitud FROM empleado WHERE activo = true ORDER BY fecha_ingreso DESC LIMIT 10 ) AS subconsulta WHERE similitud > 0.07 ORDER BY similitud DESC;",
    
}
module.exports = sqlQueries;