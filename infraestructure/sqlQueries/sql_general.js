const sqlQueries = {
    GET_FOTO: 
        "SELECT * FROM public.profilePhoto WHERE id_persona = \$1",

    POST_FOTO:
        "INSERT INTO profilePhoto(id_persona, hex) VALUES (\$1, \$2)", 

    POST_EPS:
        "INSERT INTO eps (eps) VALUES (\$1);",

    POST_GENERO:
        "INSERT INTO genero (genero) VALUES (\$1);",

    GET_EPS_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(eps, \$1) AS similitud FROM eps) as sc where similitud > 0.07",

    GET_EPS_LIST:
        "SELECT * FROM EPS",

    GET_GENERO_LIST:
        "SELECT * FROM GENERO",
    
    GET_GENERO_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(genero, \$1) AS similitud FROM genero) as sc where similitud > 0.07",

    GET_EPS:
        "SELECT * FROM EPS WHERE id = \$1",

    GET_ORIENTACION:
        "SELECT orientacion FROM orientacion WHERE id = \$1",
        
    GET_SEDE:
        "SELECT sede FROM sede WHERE id = \$1",

    GET_TIPO_DOC:
        "SELECT abreviacion FROM tipo_doc WHERE id = \$1;", 
    
    GET_MODULO:
        "SELECT modulo FROM modulo WHERE id = \$1;",

    GET_USER: 
        "SELECT * FROM USERS WHERE email = \$1;", 
    
    CREATE_USER:
        "INSERT INTO empleado (id, id_tipo_doc, p_nombre, s_nombre, p_apellido, s_apellido, id_profesion, tarjeta_profesional, id_cargo, activo, id_genero, fecha_ingreso, pertenencia_de_modulo, fecha_nacimiento) VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8, \$9, \$10, \$11, CURRENT_DATE, \$12, \$13)",
    
    CREATE_USER_ACCOUNT:
        "INSERT INTO USERS (id, email, contrasena, cargo) VALUES (\$1, \$2, \$3, \$4)",
    
    POST_DIAGNOSTICO:
        "INSERT INTO public.enfermedades(enfermedad) VALUES (\$1)", 
    
    POST_SEDE:
        "INSERT INTO public.sede( sede, direccion) VALUES (\$1, \$2)",
    
    POST_RIESGO:
        "INSERT INTO public.riesgos( riesgo) VALUES (\$1);",

    POST_ALERGIA:
        "INSERT INTO public.tipo_alergia(alergia) VALUES (\$1);",
      
    POST_ORIENTACION:
        "INSERT INTO public.orientacion( orientacion) VALUES (\$1);",

    GET_TIPO_DOC_LIST:
        "SELECT * FROM TIPO_DOC",
    
    GET_TIPO_DOC_LIST_BUSQUEDA:
        "select * from (SELECT *, SIMILARITY(ABREVIACION, \$1) AS similitud FROM TIPO_DOC) as sc where similitud > 0.07",
};
module.exports = sqlQueries;