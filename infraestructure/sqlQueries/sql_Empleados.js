const sqlQueries = {

    GET_BENEFICIARIOS_A_CARGO: 
        "select *, EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad from beneficiario where id_psicologo = \$1  or id_trabajador_social = \$1;",

    GET_CONSULTAS_LAST_TEN:
        "SELECT * FROM reporte_modulo WHERE id_empleado = \$1 LIMIT 10",

    GET_ADMIN: 
        "SELECT * FROM users WHERE id = \$1",

    PUT_EMPLEADO_ISADMIN:
        "UPDATE users SET cargo = \$2 WHERE id = \$1",

    GET_EMPLEADOS_GENEROS:
        "SELECT DISTINCT id_genero FROM EMPLEADO WHERE ACTIVO = TRUE",

    GET_EMPLEADOS_CONSULTA_ULTIMO_MES:
        "select S.id_beneficiario, S.fecha, T.id_modulo from (SELECT id_beneficiario, MAX(fecha) as fecha FROM reporte_modulo WHERE id_empleado = \$1 GROUP BY id_beneficiario) AS S LEFT JOIN REPORTE_MODULO AS T ON S.id_beneficiario = T.id_beneficiario WHERE S.id_beneficiario = T.id_beneficiario AND S.fecha = T.fecha ORDER BY S.fecha DESC;",

    GET_EMPLEADOS_CONSULTA_URL:
        "SELECT * FROM public.reporte_modulo WHERE id_empleado = \$1 AND isFormat = \$2 ORDER BY fecha DESC",

    PUT_INFO:
        "UPDATE empleado SET p_nombre = \$2, s_nombre = \$3, p_apellido = \$4, s_apellido = \$5, id_tipo_doc = \$6 WHERE id = \$1",

    PUT_EMPLEADO_CARGO: 
        "UPDATE empleado SET id_cargo = \$2 WHERE id = \$1",

    PUT_EMPLEADO_PROFESION: 
        "UPDATE empleado SET id_profesion = \$2 WHERE id = \$1",

    PUT_EMPLEADO_MODULO: 
        "UPDATE empleado SET pertenencia_de_modulo = \$2 WHERE id = \$1",

    GET_PROFESION_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(profesion, \$1) AS similitud FROM profesion) as sc where similitud > 0.07",

    GET_PROFESION_LIST:
        "select * from profesion",

    GET_CARGO_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(cargo, \$1) AS similitud FROM cargo) as sc where similitud > 0.07",

    GET_CARGO_LIST:
        "select * from cargo",

    GET_MODULO_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(modulo, \$1) AS similitud FROM modulo) as sc where similitud > 0.07",

    GET_MODULO_LIST:
        "select * from modulo",

    PUT_ESTADO_EMPLEADO:
        "UPDATE empleados SET activo = false WHERE id=\$1",

    GET_TIPO_CARGO:
        "SELECT cargo FROM users WHERE id = \$1",

    GET_EMPLEADOS_PERFIL:
        "SELECT *,EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM empleado WHERE id = \$1",

    GET_EMPLEADOS_MODULOS:
        "SELECT DISTINCT PERTENENCIA_DE_MODULO FROM EMPLEADO WHERE ACTIVO = TRUE",

    GET_EMPLEADOS_CARGOS:
        "SELECT DISTINCT ID_CARGO FROM EMPLEADO WHERE ACTIVO = TRUE",

    GET_EMPLEADO_CARGO:
        "SELECT *,EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM empleado WHERE activo = true", 

    GET_EMPLEADO_CARGO_IDENTITY:
        "SELECT *, EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM empleado WHERE activo = true AND (SIMILARITY(CONCAT(p_nombre,' ', s_nombre,' ', p_apellido,' ', s_apellido, ' ',id), \$1) > 0.07);",

    GET_EMPLEADO_EDAD_FILTER:
        "SELECT *,EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM empleado WHERE activo = true AND EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN \$3 AND \$4 OFFSET \$1 LIMIT \$2",

    GET_EMPLEADO:
        "SELECT *,EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM empleado WHERE activo = true", 

    GET_EMPLEADO_IDENTITY:
        "SELECT * FROM ( SELECT *, EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) AS edad FROM empleado WHERE activo = true AND (SIMILARITY(CONCAT(p_nombre, ' ', s_nombre, ' ', p_apellido, ' ', s_apellido), \$1) > 0.07 OR SIMILARITY(CAST(id AS TEXT), \$1) > 0.8) ) AS busqueda",

    GET_NOMBRE: 
        "SELECT * FROM empleado WHERE id = \$1",

    GET_EMPLEADOS_EGRESADOS:
        "SELECT COUNT(*) FROM egreso WHERE TIPO_USUARIO = FALSE;",
    
    GET_EMPLEADOS_EGRESADOS_PASADO:
        "SELECT COUNT(*) FROM egreso WHERE EXTRACT(MONTH FROM fecha) != EXTRACT(MONTH FROM CURRENT_TIMESTAMP) AND TIPO_USUARIO = FALSE;",

    GET_EMPLEADOS_ACTUALES:
        "SELECT COUNT(*) FROM empleado WHERE activo = true;",

    GET_EMPLEADOS_ACTUALES_PASADO:
        "SELECT COUNT(*) FROM empleado WHERE activo = true AND EXTRACT(MONTH FROM fecha_ingreso) != EXTRACT(MONTH FROM CURRENT_TIMESTAMP);",
    
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