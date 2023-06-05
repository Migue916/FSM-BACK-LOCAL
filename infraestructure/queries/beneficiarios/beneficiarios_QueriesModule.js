module.exports = {

    post_consulta: require("./post_consulta"),
    get_Consultas_url: require("./get_Consultas_url"),

    post_beneficiario: require("./post_beneficiario"),

    put_beneficiario: require("./put_beneficiario"),
    post_egreso: require("./post_egreso"),

    get_DiagnosticoList: require("./get_DiagnosticoList"),
    get_SedeList: require("./get_SedeList"),
    get_RiesgosList: require("./get_RiesgosList"),
    get_AlergiasList: require("./get_AlergiasList"),
    get_OrientacionList: require("./get_OrientacionList"),

    put_Diagnostico: require("./put_Diagnostico"),
    put_Sede: require("./put_Sede"),
    put_Riesgos: require("./put_Riesgos"), 
    put_Alergias: require("./put_Alergias"),
    put_Orientacion: require("./put_Orientacion"),

    delete_Diagnostico:require("./delete_Diagnostico"),
    delete_Riesgos:require("./delete_Riesgos"), 
    delete_Alergias:require("./delete_Alergias"),

    get_Perfil:require("./get_Perfil"),
    get_riesgos:require("./get_riesgos"),
    get_riesgos_list:require("./get_riesgos_list"),
    get_alergias:require("./get_alergias"),
    get_alergias_list:require("./get_alergias_list"),
    get_diagnosticos_secundarios:require("./get_diagnosticos_secundarios"),

    get_BeneficiariosActuales: require("./get_BeneficiariosActuales"),
    get_BeneficiariosActualesPasado: require("./get_BeneficiariosActualesPasado"),
    get_BeneficiariosEgresados: require("./get_BeneficiariosEgresados"),
    get_BeneficiariosEgresadosPasado: require("./get_BeneficiariosEgresadosPasado"),
    get_BeneficiariosNuevos: require("./get_BeneficiariosNuevos"),
    get_BeneficiariosNuevosPasado: require("./get_BeneficiariosNuevosPasado"),

    get_BeneficiariosLastTen: require("./get_BeneficiariosLastTen"),

    get_BuscaPorNombre: require("./get_BuscaPorNombre"),

    get_BalanceNuevos: require("./get_BalanceNuevos"),
    get_BalanceEgresados: require("./get_BalanceEgresados"),
    get_anios: require("./get_anios"),

    get_Diagnosticos: require("./get_Diagnosticos"),
    get_tipos_diagnosticos: require("./get_tipos_diagnosticos"),

    get_EstEdad: require("./get_EstEdad"),

    get_diagnostico_principal: require("./get_diagnostico_principal"),
    get_Consultas: require("./get_Consultas"),
    get_Beneficiarios: require("./get_Beneficiarios"),

    get_BeneficiariosEdades: require("./get_BeneficiariosEdades"),
    get_BeneficiariosDiagnosticos: require("./get_BeneficiariosDiagnosticos"),
    get_BeneficiariosSedes:require("./get_BeneficiariosSedes"),
    get_BeneficiariosFechasIng:require("./get_BeneficiariosFechasIng"),
    getBeneficiarios_Genero: require("./get_Beneficiarios_Genero"),

    
    
};