const sqlQueries = {
    DELETE_ALERGIA:
        "DELETE FROM public.beneficiario_rel_tipo_alergia WHERE id_beneficiario = \$1 AND id_tipo_alergia  = \$2 AND id_empleado = \$3;",

    DELETE_RIESGOS:
        "DELETE FROM public.beneficiario_rel_riesgo WHERE id_beneficiario = \$1 AND id_riesgo = \$2;",

    DELETE_DIAGNOSTICO: 
        "DELETE FROM public.enfermedad_rel_beneficiario WHERE id_beneficiario = \$1 AND id_enfermedad  = \$2 AND id_empleado = \$3;", 

    PUT_ORIENTACION:
        "UPDATE public.beneficiario SET id_orientacion=\$2 WHERE id = \$1",

    PUT_ALERGIA:
        "INSERT INTO public.beneficiario_rel_tipo_alergia( id_beneficiario, id_tipo_alergia, id_empleado, observacion) VALUES (\$1, \$2, \$3, \$4);",

    PUT_RIESGOS: 
        "INSERT INTO public.beneficiario_rel_riesgo( id_beneficiario, id_riesgo, observacion) VALUES (\$1, \$2, \$3);",

    PUT_SEDE:
        "UPDATE public.beneficiario SET id_sede=\$2 WHERE id = \$1;",

    PUT_DIAGNOSTICO:
        "INSERT INTO public.enfermedad_rel_beneficiario( id_enfermedad, id_beneficiario, id_empleado, tipo, observacion) VALUES (\$1, \$2, \$3, \$4, \$5);",
   
    GET_ORIENTACION_LIST:
        "select * from (SELECT *, SIMILARITY(orientacion, \$1) AS similitud FROM orientacion) as sc where similitud > 0.08",

    GET_ALERGIAS_LIST:
        "select * from (SELECT *, SIMILARITY(alergia, \$1) AS similitud FROM tipo_alergia) as sc where similitud > 0.4",

    GET_RIESGO_LIST:
        "select * from (SELECT *, SIMILARITY(riesgo, \$1) AS similitud FROM riesgos) as sc where similitud > 0.07",

    GET_SEDE_LIST:
        "select * from (SELECT *, SIMILARITY(sede, \$1) AS similitud FROM sede) as sc where similitud > 0.07",

    GET_DIAGNOSTICOS_LIST:
        "select * from (SELECT *, SIMILARITY(enfermedad, \$1) AS similitud FROM enfermedades) as sc where similitud > 0.07",

    GET_BENEFICIARIO_DIAGNOSTICOS_SECUNDARIOS:
        "SELECT * FROM enfermedad_rel_beneficiario WHERE id_beneficiario = \$1 AND tipo = false",
    
    GET_BENEFICIARIO_ALERGIAS_LIST:
        "SELECT * FROM tipo_alergia WHERE id = \$1",

    GET_BENEFICIARIO_ALERGIAS:
        "SELECT * FROM beneficiario_rel_tipo_alergia WHERE id_beneficiario = \$1",

    GET_BENEFICIARIO_RIESGOS_LIST:
        "select * from riesgos where id = \$1",

    GET_BENEFICIARIO_RIESGOS:
        "SELECT * FROM beneficiario_rel_riesgo WHERE id_beneficiario = \$1",

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
        "SELECT * FROM beneficiario WHERE estado = true ORDER BY fecha_ingreso DESC LIMIT 10;", 
        
    GET_BENEFICIARIOS_POR_NOMBRE:
        "SELECT * FROM ( SELECT *, SIMILARITY(CONCAT(p_nombre,' ', s_nombre,' ', p_apellido,' ', s_apellido), \$1) AS similitud FROM beneficiario WHERE estado = true ORDER BY fecha_ingreso DESC LIMIT 10 ) AS subconsulta WHERE similitud > 0.07 ORDER BY similitud DESC;",
    
    GET_BALANCE_NUEVOS: 
        "SELECT EXTRACT(MONTH FROM fecha_ingreso) AS mes, COUNT(*) FROM beneficiario WHERE EXTRACT(YEAR FROM fecha_ingreso) = \$1 GROUP BY mes ORDER BY mes;",
    
    GET_BALANCE_EGRESADOS:
        "SELECT EXTRACT(MONTH FROM fecha) AS mes, COUNT(*) FROM egreso WHERE EXTRACT(YEAR FROM fecha) = \$1 AND TIPO_USUARIO = TRUE GROUP BY mes ORDER BY mes;",
    
    GET_ANIOS:
        "SELECT EXTRACT(YEAR FROM fecha_INGRESO) AS anio FROM beneficiario GROUP BY anio ORDER BY anio;",

    GET_DIAGNOSTICOS: 
        "SELECT id_enfermedad, count(*) from enfermedad_rel_beneficiario group by id_enfermedad;",
    
    GET_TIPOS_DIAGNOSTICOS:
        "SELECT enfermedad from enfermedades where id = \$1;",    
    
    GET_ESTADISTICA_POR_EDAD:
        "SELECT CASE WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 0 AND 9 THEN '0-9' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 10 AND 19 THEN '10-19' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 20 AND 29 THEN '20-29' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 30 AND 39 THEN '30-39' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 40 AND 49 THEN '40-49' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 50 AND 59 THEN '50-59' WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) BETWEEN 60 AND 69 THEN '60-69' ELSE '70+' END AS rango_edad, COUNT(*) FROM Beneficiario GROUP BY rango_edad ORDER BY rango_edad;",
    
    GET_BENEFICIARIO_DIAGNOSTICO_PRINCIPAL:
        "SELECT  * FROM enfermedad_rel_beneficiario WHERE tipo = TRUE and id_beneficiario = \$1;",    
    
    GET_BENEFICIARIO_ULTIMA_CONSULTA:
        "SELECT * FROM reporte_modulo WHERE id_beneficiario = \$1 order by fecha DESC LIMIT 1",   
    
    GET_BENEFICIARIO:
        "SELECT *,EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM beneficiario WHERE estado = true OFFSET \$1 LIMIT \$2",   
    
    GET_BENEFICIARIOS_EDADES:
        "SELECT DISTINCT EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM beneficiario WHERE estado = true",
    
    GET_BENEFICIARIOS_DIAGNOSTICOS:
        "SELECT DISTINCT id_enfermedad from enfermedad_rel_beneficiario where tipo=true",
       
    GET_BENEFICIARIOS_SEDES:
        "SELECT DISTINCT id_sede from beneficiario WHERE ESTADO = TRUE",
    
    GET_BENEFICIARIOS_FECHAS_INGRESO:
        "SELECT DISTINCT fecha_ingreso from beneficiario WHERE ESTADO = TRUE",
    
    GET_BENEFICIARIO_IDENTITY:
        "SELECT * FROM ( SELECT *, EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)) as edad FROM beneficiario WHERE estado = true AND ((SIMILARITY(CONCAT(p_nombre,' ', s_nombre,' ', p_apellido,' ', s_apellido), \$3)) > 0.07 OR id = cast(\$3 AS INTEGER)) ) AS busqueda OFFSET \$1 LIMIT \$2",

    CREATE_BENEFICIARIO:
        "INSERT INTO public.beneficiario(id, id_tipo_doc, p_nombre, s_nombre, p_apellido, s_apellido, id_sede, fecha_nacimiento, id_genero, id_orientacion, fecha_ingreso, id_eps, id_psicologo, id_trabajador_social, estado) VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8, \$9, \$10, CURRENT_DATE, \$11, \$12, \$13, \$14)",

    PUT_ESTADO_BENEFICIARIO:
        "UPDATE public.beneficiario SET estado = false WHERE id = \$1",

    POST_EGRESO:
        "INSERT INTO public.egreso( id_persona, fecha, observacion, tipo_usuario) VALUES (\$1, CURRENT_DATE, \$2, \$3);",
}; 
    
module.exports = sqlQueries;