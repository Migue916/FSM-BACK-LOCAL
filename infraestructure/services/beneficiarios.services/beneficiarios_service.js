const queries_Beneficiarios = require("../../queries/beneficiarios/beneficiarios_QueriesModule");
const queries_General = require("../../queries/general/general_QueriesModule");
const queries_Empleados = require("../../queries/empleados/empleados_QueriesModule");
const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=cs7100320029bb315a8;AccountKey=9PkVAwI5INo9uZZmOqoFPNN+yoypiOaMbR+q2Wa0zO0Qe4xPlUfv9qfMqzHrO7HU1BJzqnX2fltd+AStYdf8KA==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);



exports.postFoto = async(foto) =>{
  containter = "profilePhotos";
  const containerClient = blobServiceClient.getContainerClient(container);
  await containerClient.createIfNotExists();

  const blockBlobClient = containerClient.getBlockBlobClient(foto.foto);
  const data = fs.readFileSync(foto.foto);
  await blockBlobClient.uploadData(data);
  
  const storageUrl = blockBlobClient.url;

  const Foto = {
    id_persona: foto.id,
    ruta: storageUrl
  };

try { 
    const postFoto = await queries_General.post_Foto(Foto);
      const results = [];
      results.push(postFoto);
      return results;
} catch (error) {
  throw error;
}
};


exports.postConsultas = async(consulta) =>{
    containter = consulta.id_beneficiario + consulta.id_modulo
    const containerClient = blobServiceClient.getContainerClient(container);
    await containerClient.createIfNotExists();
  
    const blockBlobClient = containerClient.getBlockBlobClient(consulta.consulta);
    const data = fs.readFileSync(consulta.consulta);
    await blockBlobClient.uploadData(data);
    
    const storageUrl = blockBlobClient.url;

    const Consulta = {
      id_beneficiario: consulta.id_beneficiario,
      id_empleado: consulta.id_empleado,
      id_modulo: consulta.id_modulo,
      ruta: storageUrl
    };

  try { 
      const postConsulta = await queries_Beneficiarios.post_consulta(Consulta);
        const results = [];
        results.push(postConsulta);
        return results;
  } catch (error) {
    throw error;
  }
};

exports.getFoto = async (id) => {
  try { 
    const getFoto = await queries_General.get_Foto(id);
        const result = {
          id: getFoto.id_persona,
          ruta: getFoto.hex
        };
        return result;
} catch (error) {
  throw error;
}
};

exports.getOrientacionList = async (orientacion) => {
  try { 
    const getOrientacionList = await queries_Beneficiarios.get_OrientacionList(orientacion);
      const results = [];
      for (const row of getOrientacionList){
        const result = {
          id: row.id,
          Orientacion: row.orientacion
        };
        results.push(result);
      }
        return results;
} catch (error) {
  throw error;
}
};

exports.getConsulta = async (id) => {
  try { 
    const getConsulta = await queries_Beneficiarios.get_Consultas_url(id);
      const results = [];
      for (const row of getConsulta){

        const modulo = await queries_General.get_Modulo(row.id_modulo);
        const nombreEmpleado = this.nombreEmpleado(row.id_empleado);

        const result = {
          url: row.hex,
          modulo: modulo, 
          responsable: nombreEmpleado,
          fecha: row.fecha
        };
        results.push(result);
      }
        return results;
} catch (error) {
  throw error;
}
};

exports.nombreEmpleado = async(id) =>{
  try { 
    const nombreEmpleado = await queries_Empleados.get_nombre(id);
    const result = {
      id: id,
      Nombre: get_nombre[0].p_nombre + " " + get_nombre[0].s_nombre,
      Apellido: get_nombre[0].p_apellido + " " + get_nombre[0].s_apellido,
      Cargo: get_nombre[0].cargo
    };
    return result;
} catch (error) {
  throw error;
}
};

exports.getAlergiasList = async (alergias) => {
  try { 
    const getAlergiasList = await queries_Beneficiarios.get_AlergiasList(alergias);
      const results = [];
      for (const row of getAlergiasList){
        const result = {
          id: row.id,
          Alergia: row.alergia
        };
        results.push(result);
      }
        return results;
} catch (error) {
  throw error;
}
};

exports.postEps = async (eps) => {
  try { 
    const postEps = await queries_General.post_Eps(eps);
      const results = [];
      results.push(postEps);
      return results;
} catch (error) {
  throw error;
}
};

exports.postGenero = async (genero) => {
  try { 
    const postGenero = await queries_General.post_Genero(genero);
      const results = [];
      results.push(postGenero);
      return results;
} catch (error) {
  throw error;
}
};

exports.postAlergias = async (alergia) => {
  try { 
    const postAlergias = await queries_General.post_Alergias(alergia);
      const results = [];
      results.push(postAlergias);
      return results;
} catch (error) {
  throw error;
}
};

exports.deleteAlergias = async (alergia) => {
  try { 
    const deleteAlergias = await queries_Beneficiarios.delete_Alergias(alergia);
      const results = [];
      results.push(deleteAlergias);
      return results;
} catch (error) {
  throw error;
}
};

exports.deleteRiesgos = async (riesgo) => {
  try { 
    const deleteRiesgos = await queries_Beneficiarios.delete_Riesgos(riesgo);
      const results = [];
      results.push(deleteRiesgos);
      return results;
} catch (error) {
  throw error;
}
};

exports.deleteDiagnostico = async (Diagnostico) => {
  try { 
    const deleteDiagnostico = await queries_Beneficiarios.delete_Diagnostico(Diagnostico);
      const results = [];
      results.push(deleteDiagnostico);
      return results;
} catch (error) {
  throw error;
}
};


exports.putOrientacion = async (orientacion) => {
  try { 
    const putOrientacion = await queries_Beneficiarios.put_Orientacion(orientacion);
      const results = [];
      results.push(putOrientacion);
      return results;
} catch (error) {
  throw error;
}
};

exports.putAlergias = async (alergia) => {
  try { 
    const putAlergias = await queries_Beneficiarios.put_Alergias(alergia);
      const results = [];
      results.push(putAlergias);
      return results;
} catch (error) {
  throw error;
}
};

exports.putRiesgos = async (riesgos) => {
  try { 
    const putRiesgos = await queries_Beneficiarios.put_Riesgos(riesgos);
      const results = [];
      results.push(putRiesgos);
      return results;
} catch (error) {
  throw error;
}
};

exports.putSede = async (sede) => {
  try { 
    const putSede = await queries_Beneficiarios.put_Sede(sede);
      const results = [];
      results.push(putSede);
      return results;
} catch (error) {
  throw error;
}
};

exports.putDiagnostico = async (diagnostico) => {
  try { 
    const putDiagnostico = await queries_Beneficiarios.put_Diagnostico(diagnostico);
      const results = [];
      results.push(putDiagnostico);
      return results;
} catch (error) {
  throw error;
}
};

exports.postOrientacion = async (orientacion) => {
  try { 
    const postOrientacion = await queries_General.post_Orientacion(orientacion);
      const results = [];
      results.push(postOrientacion);
      return results;
} catch (error) {
  throw error;
}
};

exports.postRiesgos = async (riesgo) => {
  try { 
    const postRiesgos = await queries_General.post_Riesgos(riesgo);
      const results = [];
      results.push(postRiesgos);
      return results;
} catch (error) {
  throw error;
}
};

exports.postSede = async (sede) => {
  try { 
    const postSede = await queries_General.post_Sede(sede);
      const results = [];
      results.push(postSede);
      return results;
} catch (error) {
  throw error;
}
};

exports.postDiagnostico = async (diagnostico) => {
  try { 
    const postDiagnostico = await queries_General.post_Diagnostico(diagnostico);
      const results = [];
      results.push(postDiagnostico);
      return results;
} catch (error) {
  throw error;
}
};

exports.getDiagnosticoList = async (diagnostico) => {
  try { 
    const getDiagnosticoList = await queries_Beneficiarios.get_DiagnosticoList(diagnostico);
      const results = [];
      for (const row of getDiagnosticoList){
        const result = {
          id: row.id,
          Diagnostico: row.enfermedad
        };
        results.push(result);
      }
        return results;
} catch (error) {
  throw error;
}
};

exports.getRiesgosList = async (riegos) => {
  try { 
    const getRiesgosList = await queries_Beneficiarios.get_RiesgosList(riegos);
      const results = [];
      for (const row of getRiesgosList){
        const result = {
          id: row.id,
          riegos: row.riesgo
        };
        results.push(result);
      }
        return results;
} catch (error) {
  throw error;
}
};

exports.getEpsList = async () => {
  try { 
    const getEpsList = await queries_General.get_EpsList();
    const results = [];
    for (const row of getEpsList){
        const result = {
        id: row.id,
        eps: row.eps
      };
      results.push(result);
    }
    return results;
} catch (error) {
  throw error;
}
};

exports.getGeneroList = async () => {
  try { 
    const getGeneroList = await queries_General.get_GeneroList();
    const results = [];
    for (const row of getGeneroList){
        const result = {
        id: row.id,
        genero: row.genero
      };
      results.push(result);
    }
    return results;
} catch (error) {
  throw error;
}
};

exports.getSedeList = async (sede) => {
  try { 
    const getSedeList = await queries_Beneficiarios.get_SedeList(sede);
      const results = [];
      for (const row of getSedeList){
        const result = {
          id: row.id,
          sede: row.sede
        };
        results.push(result);
      }
        return results;
} catch (error) {
  throw error;
}
};


exports.getPerfil = async (id) => {
  try { 
    const getPerfil = await queries_Beneficiarios.get_Perfil(id);
      const results = [];

      const sede = await queries_General.get_sede(+getPerfil[0].id_sede);
      const orientacion = await queries_General.get_orientacion(+getPerfil[0].id_orientacion);
      const eps = await queries_General.get_eps(+getPerfil[0].id_eps);

      const result = {
          Nombre: getPerfil[0].p_nombre + " " + getPerfil[0].s_nombre,
          Apellido: getPerfil[0].p_apellido + " " + getPerfil[0].s_apellido,
          Identificacion: getPerfil[0].id,
          Fecha_nacimiento: getPerfil[0].fecha_nacimiento,
          Edad: getPerfil[0].edad,
          Diagnostico_p: diagnosticos_principal_beneficiario(+getPerfil[0].id),
          Sede: sede[0].sede, 
          Fecha_ingreso: getPerfil[0].fecha_ingreso, 
          Diagnostico_s: await diagnosticos_secundarios_beneficiario(+getPerfil[0].id),
          Riesgos: await riesgos_beneficiario(+getPerfil[0].id),
          Alergias: await alergias_beneficiario(+getPerfil[0].id),
          Orientacion: orientacion[0].orientacion,
          eps: eps[0].eps,
        };   
        results.push(result);
        return results;
} catch (error) {
  throw error;
}
};

const diagnosticos_principal_beneficiario = async(id) =>{
  const diagnostico_principal = await queries_Beneficiarios.get_diagnostico_principal(id);
  var getDiagnostico = [];
  if (diagnostico_principal.length === 0) {
    return getDiagnostico;
  }
  getDiagnostico = await queries_Beneficiarios.get_tipos_diagnosticos(diagnostico_principal[0].id_enfermedad);
  return getDiagnostico[0].enfermedad;
  
};

const diagnosticos_secundarios_beneficiario = async (id) => {
  try { 
    const diagnosticos_secundarios = await queries_Beneficiarios.get_diagnosticos_secundarios(id);
    var allDiagnosticos = [];
  
    if (diagnosticos_secundarios.length === 0) {
      return allDiagnosticos;
    } else {
      for (const row of diagnosticos_secundarios) {
        const diagnosticos_secundario = await queries_Beneficiarios.get_tipos_diagnosticos(row.id_enfermedad);
        allDiagnosticos.push({ 
            diagnosticos_secundario: diagnosticos_secundario[0].enfermedad,
            Empleado: nombreEmpleado(diagnosticos_secundario[0].id)[0].Nombre,
            Fecha: diagnosticos_secundario[0].fecha
          });
      }
    }
    return allDiagnosticos;
} catch (error) {
  throw error;
}
};


const riesgos_beneficiario = async (id) => {
  try { 
    const riesgos = await queries_Beneficiarios.get_riesgos(id);
    const allRiesgo = [];
    if (riesgos.length === 0) {

    } else {
      for (const row of riesgos) {
        const riesgo = await queries_Beneficiarios.get_riesgos_list(row.id_riesgo);
        allRiesgo.push({ 
          riesgos: riesgo[0].riesgo,
          Empleado: nombreEmpleado(riesgo[0].id)[0].Nombre,
          Fecha: riesgo[0].fecha
        });
      }
    }
    return allRiesgo;
} catch (error) {
  throw error;
}
};

const alergias_beneficiario = async (id) => {
  try { 
    const alergias = await queries_Beneficiarios.get_alergias(id);
    var allAlergias = [];
  
    if (alergias.length === 0) {

    } else {
      for (const row of alergias) {
        const alergia = await queries_Beneficiarios.get_alergias_list(row.id_tipo_alergia);
        allAlergias.push({
           alergias: alergia[0].alergia,
           Empleado: nombreEmpleado(alergia[0].id)[0].Nombre,
           Fecha: alergia[0].fecha
          });
      }
    }
    return allAlergias;
  } catch (error) {
    throw error;
  }
};

exports.putEgreso = async (egreso) => {
  try { 
    const camposLlenos = Object.values(egreso).every((campo) => campo !== null && campo !== undefined);
    if(camposLlenos){
      await queries_Beneficiarios.put_beneficiario(egreso);
      await queries_Beneficiarios.post_egreso(egreso);
    }
    else 
      res.status(400);
} catch (error) {
  throw error;
}
};

exports.post_beneficiario = async (beneficiario) => {
  try { 
    const camposLlenos = Object.values(beneficiario).every((value) => value !== undefined && value !== '');
    if(camposLlenos){
      await queries_Beneficiarios.post_beneficiario(beneficiario);
    }
    else 
      res.status(400);
} catch (error) {
  throw error;
}
};

exports.getBeneficiarios = async (page) => {
  try { 
    const getBeneficiarios = await queries_Beneficiarios.get_Beneficiarios(page);
    const results = [];
    for (const row of getBeneficiarios) { 

      const sede = await queries_General.get_sede(row.id_sede);
      const ultima_consulta = await queries_Beneficiarios.get_Consultas(row.id);
      const orientacion = await queries_General.get_orientacion(row.id_orientacion);

      console.log(ultima_consulta[0].id_empleado);

      const Empleado_ultima_consulta = ultima_consulta[0].id_empleado;
      
      if(ultima_consulta.lenght === 0)
        Empleado_ultima_consulta = null;

      const result = {
        Nombre: row.p_nombre + " " +
                row.s_nombre + " " +
                row.p_apellido + " " +
                row.s_apellido,

        Identificacion: row.id,
        Edad: row.edad,
        Diagnostico_p: diagnosticos_principal_beneficiario(+row.id),
        Sede: sede[0].sede, 
        Fecha_ingreso: row.fecha_ingreso,
        Empleado_ultima_consulta: Empleado_ultima_consulta, 
        Orientacion: orientacion[0].orientacion,
      };
      results.push(result);
    }
    var filtredData = results;
    if (page.Sede !== undefined){
      filtredData = filtredData.filter(beneficiario => beneficiario.Sede = page.Sede);
    }
    if (page.Edad !== undefined){
      filtredData = filtredData.filter(beneficiario => beneficiario.Edad = +page.Edad);
    }
    if (page.Diagnostico_p !== undefined){
      filtredData = filtredData.filter(beneficiario => beneficiario.Diagnostico_p = page.Diagnostico_p);
    }
    if (page.Fecha_ingreso !== undefined){
      filtredData = filtredData.filter(beneficiario => beneficiario.Fecha_ingreso = page.Fecha_ingreso);
    }
    return filtredData;
  } catch (error) {
    throw error;
  }
};

exports.getBeneficiariosFechasIng = async () => {
  try { 
    const getBeneficiariosFechasIng = await queries_Beneficiarios.get_BeneficiariosFechasIng();
      const results = [];
        for (const row of getBeneficiariosFechasIng) { 
          const result = {
            Fecha_ingreso: row.fecha_ingreso,
          };
          results.push(result);
        }
        return results;
} catch (error) {
  throw error;
}
};

exports.getBeneficiariosSedes = async () => {
  try { 
    const getBeneficiariosSedes = await queries_Beneficiarios.get_BeneficiariosSedes();
      const results = [];
        for (const row of getBeneficiariosSedes) { 
          const sede = await queries_General.get_sede(row.id_sede);  
          const result = {
            sede: sede[0].sede,
          };
          results.push(result);
        }
        results.push({sede: "No_registra",});
        return results;
} catch (error) {
  throw error;
}
};

exports.getBeneficiariosDiagnosticos = async () => {
  try { 
    const getBeneficiariosDiagnosticos = await queries_Beneficiarios.get_BeneficiariosDiagnosticos();
      const results = [];
        for (const row of getBeneficiariosDiagnosticos) { 
          const diagnostico = await queries_Beneficiarios.get_tipos_diagnosticos(row.id_enfermedad);  
          const result = {
            Diagnosticos: diagnostico[0].enfermedad,
          };
          results.push({Diagnosticos: "No_registra",});
          results.push(result);
        }
        return results;
} catch (error) {
  throw error;
}
};

exports.getBeneficiariosEdades = async () => {
  try { 
    const getBeneficiariosEdades = await queries_Beneficiarios.get_BeneficiariosEdades();
      const results = [];
        for (const row of getBeneficiariosEdades) { 
          const result = {
            edad: row.edad,
          };
          results.push(result);
        }
        return results;
} catch (error) {
  throw error;
}
};

exports.getEstEdad = async () => {
  try { 
    const getEstEdad = await queries_Beneficiarios.get_EstEdad();
      const results = [];
        for (const row of getEstEdad) { 
          const result = {
            rango_edad: row.rango_edad,
            cantidad: row.count,
          };
          results.push(result);
        }
        return results;
} catch (error) {
  throw error;
}
};

exports.getDiagnosticos = async () => {
  try { 
    const getDiagnosticos = await queries_Beneficiarios.get_Diagnosticos();
      const results = [];
        for (const row of getDiagnosticos) {
          const diagnostico = await queries_Beneficiarios.get_tipos_diagnosticos(row.id_enfermedad);  
          const result = {
            diagnostico: diagnostico[0].enfermedad,
            cantidad: row.count,
          };
          results.push(result);
        }
        return results;
} catch (error) {
  throw error;
}
};

exports.getAnios = async () => {
  try { 
    const getAnios = await queries_Beneficiarios.get_anios();
        const results = [];
      
        for (const row of getAnios) {
          const anio = row.anio;
          const result = {
            anio: anio
          };
    
          results.push(result);
        }
        return results;
} catch (error) {
  throw error;
}
};

function ObtenerMes(mes){
  switch (mes){
    case 1:
      mes = 'Ene';
      break;
    case 2:
      mes = 'Feb';
      break;
    case 3:
      mes = 'Mar';
      break;
    case 4:
      mes = 'Abr';
      break;
    case 5:
      mes = 'May';
      break;
    case 6:
      mes = 'Jun';
      break;
    case 7:
      mes = 'Jul';
      break;
    case 8:
      mes = 'Agos';
      break;
    case 9:
      mes = 'Sep';
      break;
    case 10:
      mes = 'Oct';
      break;
    case 11:
      mes = 'Nov';
      break;
    case 12:
      mes = 'Dic';
      break;
  };
  return mes;
};
exports.getBalance = async (anio) => {
  try { 
    const getBalanceNuevos = await queries_Beneficiarios.get_BalanceNuevos(anio);
    const getBalanceEgresados = await queries_Beneficiarios.get_BalanceEgresados(anio);
    const results = [];
    const meses = Array.from({ length: 12 }, (_, i) => i+1);
    for (let i = 0; i < meses.length; i++){
      let mesNuevos = getBalanceNuevos.filter(element => element.mes === meses[i]);
      let mesEgresos = getBalanceEgresados.filter(element => element.mes === meses[i]);
      if(mesNuevos.length === 0){
        mesNuevos = {
          mes: meses[i],
          cant: 0
        };
      }
      if(mesEgresos.length === 0){
        mesEgresos = {
          mes: meses[i],
          cant: 0
        };
      }
      const result = {
        Mes: ObtenerMes(meses[i]),
        Nuevos: mesNuevos[0].count,
        Egresados: mesEgresos[0].count
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getBuscaPorNombre = async (nombre) => {
  try { 
    const buscaPorNombre = await queries_Beneficiarios.get_BuscaPorNombre(nombre);
    const results = [];
       
    for (const row of buscaPorNombre) {
      const id = row.id;
      const id_tipo_doc = row.id_tipo_doc;
      const primer_nombre = row.p_nombre;
      const segundo_nombre = row.s_nombre;
      const primer_apellido = row.p_apellido;
      const segundo_apellido = row.s_apellido;
      const id_sede = row.id_sede;
      const fecha_nacimiento = row.fecha_nacimiento;
      const id_orientacion = row.id_orientacion;
      const fecha_ingreso = row.fecha_ingreso;
  
      const tipo_doc = await queries_General.get_tipo_doc(+id_tipo_doc);
      const sede = await queries_General.get_sede(+id_sede);
      const orientacion = await queries_General.get_orientacion(+id_orientacion);
  
      const result = {
        id: id,
        tipo_doc: tipo_doc[0].abreviacion,
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        sede: sede[0].sede,
        fecha_nacimiento: fecha_nacimiento,
        orientacion: orientacion[0].orientacion,
        fecha_ingreso: fecha_ingreso,
      };
  
      results.push(result);
    }
    return results;
} catch (error) {
  throw error;
}
};


exports.getBeneficiariosLastTen = async () => {
    try { 
      const lastTen = await queries_Beneficiarios.get_BeneficiariosLastTen();
          const results = [];
        
          for (const row of lastTen) {
            const id = row.id;
            const id_tipo_doc = row.id_tipo_doc;
            const primer_nombre = row.p_nombre;
            const segundo_nombre = row.s_nombre;
            const primer_apellido = row.p_apellido;
            const segundo_apellido = row.s_apellido;
            const id_sede = row.id_sede;
            const fecha_nacimiento = row.fecha_nacimiento;
            const edad = row.edad;
            const id_orientacion = row.id_orientacion;
            const fecha_ingreso = row.fecha_ingreso;
        
            const tipo_doc = await queries_General.get_tipo_doc(+id_tipo_doc);
            const sede = await queries_General.get_sede(+id_sede);
            const orientacion = await queries_General.get_orientacion(+id_orientacion);
        
            const result = {
              id: id,
              tipo_doc: tipo_doc[0].abreviacion,
              primer_nombre: primer_nombre,
              segundo_nombre: segundo_nombre,
              primer_apellido: primer_apellido,
              segundo_apellido: segundo_apellido,
              sede: sede[0].sede,
              edad: edad,
              Diagnostico_p: diagnosticos_principal_beneficiario(+row.id),
              fecha_nacimiento: fecha_nacimiento,
              orientacion: orientacion[0].orientacion,
              fecha_ingreso: fecha_ingreso,
            };
        
            results.push(result);
          }
          return results;
  } catch (error) {
    throw error;
  }
};

exports.getBeneficiariosActuales = async () => {
  try {
    const actual = 
      await queries_Beneficiarios.get_BeneficiariosActuales();
    const pasado = 
      await queries_Beneficiarios.get_BeneficiariosActualesPasado();
    const porcentaje = (100 / (+pasado[0].count)) * ((+actual[0].count) - (+pasado[0].count));

    const result = {
      value: +actual[0].count,
      percentage: Number(porcentaje).toFixed(2)
    };
    return result;
  } catch (error) {
    throw error;
  }
};


exports.getBeneficiariosEgresados = async () => {
  try {
    const actual =
      await queries_Beneficiarios.get_BeneficiariosEgresados();
    const pasado =
      await queries_Beneficiarios.get_BeneficiariosEgresadosPasado();
    const porcentaje = (100/(+pasado[0].count))*((+actual[0].count) - (+pasado[0].count));

    const result = {
      value: +actual[0].count,
      percentage: Number(porcentaje).toFixed(2)
    };
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getBeneficiariosNuevos = async () => {
  try {
    const actual =
      await queries_Beneficiarios.get_BeneficiariosNuevos();
    const pasado =
      await queries_Beneficiarios.get_BeneficiariosNuevosPasado();
    const porcentaje = (100/(+pasado[0].count))*((+actual[0].count) - (+pasado[0].count));

    const result = {
      value: +actual[0].count,
      percentage: Number(porcentaje).toFixed(2)
    };
    return result;
  } catch (error) {
    throw error;
  }
};
