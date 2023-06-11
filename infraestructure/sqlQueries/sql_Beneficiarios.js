const sqlQueries = {
    GET_BENEFICIARIO_MEDICAMENTOS_LIST:
        "SELECT * FROM medicamento WHERE id = \$1",

    GET_BENEFICIARIOS_MEDICAMENTO:
        "SELECT * from beneficiario_rel_medicamento where id_beneficiario = \$1",

    GET_BENEFICIARIOS_ORIENTACION:
        "SELECT DISTINCT id_orientacion FROM beneficiario",
    GET_BENEFICIARIOS_RIESGO:
        "SELECT DISTINCT id_riesgo from beneficiario_rel_riesgo",

    GET_BENEFICIARIOS_GENERO:
        "SELECT DISTINCT id_genero from beneficiario where estado = true",

    GET_BENEFICIARIO_CONSULTA_URL:
        "SELECT * FROM public.reporte_modulo WHERE id_beneficiario = \$1",
    
    PUT_CONSULTA:
        "UPDATE public.reporte_modulo SET id_empleado = \$1, hex = \$4, fecha = CURRENT_DATE WHERE id_beneficiario = \$2 AND hex = \$3",

    POST_CONSULTA:
        "INSERT INTO public.reporte_modulo (id_beneficiario, id_empleado, id_modulo, hex, fecha) VALUES (\$2, \$1, \$3, \$4, CURRENT_DATE)",

    DELETE_ALERGIA:
        "DELETE FROM public.beneficiario_rel_tipo_alergia WHERE id_beneficiario = \$1 AND id_tipo_alergia  = \$2 AND id_empleado = \$3;",

    DELETE_RIESGOS:
        "DELETE FROM public.beneficiario_rel_riesgo WHERE id_beneficiario = \$1 AND id_riesgo = \$2;",

    DELETE_MEDICAMENTO:
        "DELETE FROM public.beneficiario_rel_medicamento WHERE id_beneficiario = \$1 AND id_medicamento = \$2;",

    DELETE_DIAGNOSTICO: 
        "DELETE FROM public.enfermedad_rel_beneficiario WHERE id_beneficiario = \$1 AND id_enfermedad  = \$2 AND id_empleado = \$3;", 

    PUT_ORIENTACION:
        "UPDATE public.beneficiario SET id_orientacion=\$2 WHERE id = \$1",

    PUT_ALERGIA:
        "INSERT INTO public.beneficiario_rel_tipo_alergia( id_beneficiario, id_tipo_alergia, id_empleado, fecha, observacion) VALUES (\$1, \$2, \$3, CURRENT_DATE, \$4);",

    PUT_RIESGOS: 
        "INSERT INTO public.beneficiario_rel_riesgo( id_beneficiario, id_riesgo, id_empleado, fecha, observacion) VALUES (\$1, \$2, \$3, CURRENT_DATE, \$4);",

    PUT_SEDE:
        "UPDATE public.beneficiario SET id_sede=\$2 WHERE id = \$1;",

    PUT_MEDICAMENTO:
        "INSERT INTO public.beneficiario_rel_medicamento( id_medicamento, id_beneficiario, id_empleado, fecha, observacion) VALUES (\$1, \$2, \$3, CURRENT_DATE, \$4);",

    PUT_DIAGNOSTICO:
        "INSERT INTO public.enfermedad_rel_beneficiario( id_enfermedad, id_beneficiario, id_empleado, fecha, tipo, observacion) VALUES (\$1, \$2, \$3, CURRENT_DATE,\$4, \$5);",
   
    GET_ORIENTACION_LIST:
        "select * from orientacion",
    
    GET_ORIENTACION_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(orientacion, \$1) AS similitud FROM orientacion) as sc where similitud > 0.07",

    GET_ALERGIAS_LIST:
        "select * from tipo_alergia",

    GET_ALERGIAS_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(alergia, \$1) AS similitud FROM tipo_alergia) as sc where similitud > 0.07",

    GET_RIESGO_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(riesgo, \$1) AS similitud FROM riesgos) as sc where similitud > 0.07",
    
    GET_RIESGO_LIST:
        "select * from RIESGOS",

    GET_MEDICAMENTO_LIST:
        "SELECT * FROM medicamento",

    GET_MEDICAMENTO_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(sede, \$1) AS similitud FROM medicamento) as sc where similitud > 0.07",

    GET_SEDE_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(sede, \$1) AS similitud FROM sede) as sc where similitud > 0.07",
    
    GET_SEDE_LIST:
        "select * from SEDE",

    GET_DIAGNOSTICOS_LIST:
        "select * from (SELECT *, SIMILARITY(enfermedad, \$1) AS similitud FROM enfermedades) as sc where similitud > 0.07",

    GET_BENEFICIARIO_DIAGNOSTICOS_SECUNDARIOS:
        "SELECT * FROM enfermedad_rel_beneficiario WHERE id_beneficiario=\$1 AND tipo = false",
    
    GET_BENEFICIARIO_ALERGIAS_LIST:
        "SELECT * FROM tipo_alergia WHERE id=\$1",

    GET_BENEFICIARIO_ALERGIAS:
        "SELECT * FROM beneficiario_rel_tipo_alergia WHERE id_beneficiario=\$1",

    GET_BENEFICIARIO_RIESGOS_LIST:
        "select * from riesgos where id=\$1",

    GET_BENEFICIARIO_RIESGOS:
        "SELECT * FROM beneficiario_rel_riesgo WHERE id_beneficiario=\$1",

    GET_BENEFICIARIO_PERFIL:
        "SELECT *,EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM beneficiario WHERE estado = true AND id = \$1",

    GET_BENEFICIARIOS_NUEVOS:
        "SELECT COUNT(*) FROM beneficiario WHERE estado = true AND EXTRACT(MONTH FROM fecha_ingreso) = EXTRACT(MONTH FROM CURRENT_DATE);",
        
    GET_BENEFICIARIOS_NUEVOS_PASADO:
        "SELECT COUNT(*) FROM beneficiario WHERE estado = true AND EXTRACT(MONTH FROM fecha_ingreso) = EXTRACT(MONTH FROM DATE_TRUNC('month', CURRENT_DATE - interval '1 month'));",

    GET_BENEFICIARIOS_EGRESADOS:
        "SELECT COUNT(*) FROM egreso WHERE TIPO_USUARIO = TRUE;",
    
    GET_BENEFICIARIOS_EGRESADOS_PASADO:
        "SELECT COUNT(*) FROM egreso WHERE EXTRACT(MONTH FROM fecha) != EXTRACT(MONTH FROM CURRENT_DATE) AND TIPO_USUARIO = TRUE;",

    GET_BENEFICIARIOS_ACTUALES:
        "SELECT COUNT(*) FROM beneficiario WHERE estado = true;",

    GET_BENEFICIARIOS_ACTUALES_PASADO:
        "SELECT COUNT(*) FROM beneficiario WHERE estado = true AND EXTRACT(MONTH FROM fecha_ingreso) != EXTRACT(MONTH FROM CURRENT_DATE);",
    
    GET_BENEFICIARIOS_ULTIMOS_DIEZ:
        "SELECT *, EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM beneficiario WHERE estado = true ORDER BY fecha_ingreso DESC LIMIT 10;", 
        
    GET_BENEFICIARIOS_POR_NOMBRE:
        "SELECT * FROM ( SELECT *, SIMILARITY(CONCAT(p_nombre,' ', s_nombre,' ', p_apellido,' ', s_apellido), \$1)  AS similitud, EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM beneficiario WHERE estado = true ORDER BY fecha_ingreso DESC LIMIT 10 ) AS subconsulta WHERE similitud > 0.09 ORDER BY similitud DESC;",
    
    GET_BALANCE_NUEVOS: 
        "SELECT EXTRACT(MONTH FROM fecha_ingreso) AS mes, COUNT(*) FROM beneficiario WHERE EXTRACT(YEAR FROM fecha_ingreso) = \$1 GROUP BY mes ORDER BY mes;",
    
    GET_BALANCE_EGRESADOS:
        "SELECT EXTRACT(MONTH FROM fecha) AS mes, COUNT(*) FROM egreso WHERE EXTRACT(YEAR FROM fecha) = \$1 AND TIPO_USUARIO = TRUE GROUP BY mes ORDER BY mes;",
    
    GET_ANIOS:
        "SELECT EXTRACT(YEAR FROM fecha_INGRESO) AS anio FROM beneficiario GROUP BY anio ORDER BY anio;",

    GET_DIAGNOSTICOS: 
        "SELECT id_enfermedad, count(*) from enfermedad_rel_beneficiario group by id_enfermedad;",
    
    GET_TIPOS_DIAGNOSTICOS:
        "SELECT enfermedad FROM enfermedades WHERE id=\$1;",    
    
    GET_ESTADISTICA_POR_EDAD:
        "SELECT CASE WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 0 AND 5 THEN '0-5' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 6 AND 10 THEN '6-10' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 11 AND 15 THEN '11-15' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 16 AND 20 THEN '16-20' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 21 AND 25 THEN '21-25' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 26 AND 30 THEN '26-30' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 31 AND 35 THEN '31-35' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 36 AND 40 THEN '36-40' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 41 AND 45 THEN '41-45' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 46 AND 50 THEN '46-50' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 51 AND 55 THEN '51-55' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 56 AND 60 THEN '56-60' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 61 AND 65 THEN '61-65' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 66 AND 70 THEN '66-70' ELSE '70+' END AS rango_edad, COUNT(*) FROM Beneficiario WHERE estado = TRUE GROUP BY rango_edad ORDER BY rango_edad;",
    
    GET_BENEFICIARIO_DIAGNOSTICO_PRINCIPAL:
        "SELECT  * FROM enfermedad_rel_beneficiario WHERE tipo = TRUE and id_beneficiario=\$1;",    
    
    GET_BENEFICIARIO_ULTIMA_CONSULTA:
        "SELECT * FROM reporte_modulo WHERE id_beneficiario = \$1 order by fecha DESC LIMIT 1",   
    
    GET_BENEFICIARIO:
        "SELECT *,EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM beneficiario WHERE estado = true",   
    
    GET_BENEFICIARIOS_EDADES:
        "SELECT DISTINCT EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM beneficiario WHERE estado = true",
    
    GET_BENEFICIARIOS_DIAGNOSTICOS:
        "SELECT DISTINCT id_enfermedad from enfermedad_rel_beneficiario where tipo=true",
       
    GET_BENEFICIARIOS_SEDES:
        "SELECT DISTINCT id_sede from beneficiario WHERE ESTADO = TRUE",
    
    GET_BENEFICIARIOS_FECHAS_INGRESO:
        "SELECT DISTINCT fecha_ingreso from beneficiario WHERE ESTADO = TRUE",
    
    GET_BENEFICIARIO_IDENTITY:
        "SELECT * FROM ( SELECT *, EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) AS edad FROM beneficiario WHERE activo = true AND (SIMILARITY(CONCAT(p_nombre, ' ', s_nombre, ' ', p_apellido, ' ', s_apellido), \$1) > 0.07 OR SIMILARITY(CAST(id AS TEXT), '1') > 0.8) ) AS busqueda;",

    CREATE_BENEFICIARIO:
        "INSERT INTO public.beneficiario(id, id_tipo_doc, p_nombre, s_nombre, p_apellido, s_apellido, id_sede, fecha_nacimiento, id_genero, id_orientacion, fecha_ingreso, id_eps, id_psicologo, id_trabajador_social, estado) VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8, \$9, \$10, CURRENT_DATE, \$11, \$12, \$13, \$14)",

    PUT_ESTADO_BENEFICIARIO:
        "UPDATE public.beneficiario SET estado = false WHERE id = \$1",

    POST_EGRESO:
        "INSERT INTO public.egreso( id_persona, fecha, observacion, tipo_usuario) VALUES (\$1, CURRENT_DATE, \$2, \$3);",
}; 
    
module.exports = sqlQueries;