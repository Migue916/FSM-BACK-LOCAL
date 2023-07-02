const queries_Beneficiarios = require("../../queries/beneficiarios/beneficiarios_QueriesModule");
const queries_General = require("../../queries/general/general_QueriesModule");
const queries_Empleados = require("../../queries/empleados/empleados_QueriesModule");
const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=cs7100320029bb315a8;AccountKey=9PkVAwI5INo9uZZmOqoFPNN+yoypiOaMbR+q2Wa0zO0Qe4xPlUfv9qfMqzHrO7HU1BJzqnX2fltd+AStYdf8KA==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const { Blob } = require('buffer');

exports.postFoto = async (req) => {
  try {

    const id = req.body.id;

    const containerName = 'profilephotos';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
  
    const originalName = req.file.originalname;
    const newName = originalName.replace(/ /g, "_");
    const blobName = Date.now() + '_' + newName;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
    const options = { blobHTTPHeaders: { blobContentType: 'image/jpeg' } };
    await blockBlobClient.uploadData(req.file.buffer, options);
  
    const storageUrls = blockBlobClient.url;
    const storageUrlsString = storageUrls.split(', ');
    
    const getFoto = await getBlobUrl(id);

    if(getFoto.length > 0){
      const { containerName, blobName } = await getContainerAndBlobName(getFoto[0].hex);
      deleteBlob(containerName, blobName);
      await queries_General.delete_foto(id);
    }
  
    const Foto = {
      id_persona: id,
      ruta: storageUrlsString[0],
    };

    const postFoto = await queries_General.post_Foto(Foto);
    const results = {
      Estado: true
    };

    return (results);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }  
};


async function deleteBlob(containerName, blobName){
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.deleteIfExists();
}

exports.putAdjuntos = async (req) => {

  const storageUrls = upload(req);
  const storageUrlsString = storageUrls.split(', ');

  const { containerName, blobName } = await getContainerAndBlobName(req.hex);
  deleteBlob(containerName, blobName);
  
  const Consulta = {
    id_consulta: req.body.id_consulta,
    rutaAnt: req.body.hex,
    rutaNew: storageUrlsString[0]
  };

  try {
    const putAdjuntos = await queries_Beneficiarios.put_Adjuntos(Consulta);
    const results = [{Estado: true}];
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putConsulta = async (req) => {

  let hex = '';

  if(!req.body.isFormat){
    const storageUrls = upload(req);
    const storageUrlsString = storageUrls.split(', ');
    const { containerName, blobName } = await getContainerAndBlobName(req.body.hex);
    deleteBlob(containerName, blobName);
    hex = storageUrlsString[0];
  }else{
    const formato = await format(req);
    hex = JSON.stringify(formato);
  }

  const Consulta = {
    id_consulta: req.body.id_consulta,
    id_empleado: req.body.id_empleado,
    rutaAnt: req.body.hex,
    rutaNew: hex
  };

  try {
    const putConsulta = await queries_Beneficiarios.put_consulta(Consulta);
    const results = [{Estado: true}];
    return results;
  } catch (error) {
    throw error;
  }
};

function upload(req) {
  try {
    const containerName = 'consultas';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    containerClient.createIfNotExists();

    const originalName = req.file.originalname;
    const newName = originalName.normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9_.-]/g, "_");
    const blobName = Date.now() + '_' + newName;    

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const contentType = require('mime-types').lookup(req.file.originalname);
    const options = { blobHTTPHeaders: { blobContentType: contentType } };
    blockBlobClient.uploadData(req.file.buffer, options);

    const storageUrl = blockBlobClient.url;
    return storageUrl;
  }  catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  } 
}


exports.postConsulta = async (req) => {

  const storageUrls = await upload(req);
  const storageUrlsString = storageUrls.split(', ');

  const Empleado = await nombreEmpleado(req.body.id_empleado);

  const Consulta = {
    id_beneficiario: req.body.id_beneficiario,
    id_empleado: req.body.id_empleado,
    id_modulo: Empleado.id_modulo,
    nombre: req.body.nombre,
    hex: storageUrlsString[0],
    isFormat: false,
    docType: require('mime-types').lookup(req.file.originalname)
  };

  try {
    const postConsulta = await queries_Beneficiarios.post_consulta(Consulta);
    const result = {
      id: postConsulta[0].id
    };
    const results = []; 
    
    results.push(result);
    results.push(results);

    return results;
  } catch (error) {
    throw error;
  }
};

const format = async(req) => {
  const Empleado = await nombreEmpleado(req.body.id_empleado);
  const Beneficiario = await queries_Beneficiarios.get_Perfil(req.body.id_beneficiario);

  const sede = await queries_General.get_sede(Beneficiario[0].id_sede);
  const orientacion = await queries_General.get_orientacion(Beneficiario[0].id_orientacion);
  const eps = await queries_General.get_eps(Beneficiario[0].id_eps);
  const genero = await queries_General.get_genero(Beneficiario[0].id_genero);
  const tipo_doc = await queries_General.get_tipo_doc(Beneficiario[0].id_tipo_doc);

  const fechaActual = new Date();

  const year = fechaActual.getFullYear();
  const month = fechaActual.getMonth() + 1;
  const day = fechaActual.getDate();
  const hours = fechaActual.getHours();
  const minutes = fechaActual.getMinutes();

  const fechaFormateada = `${year}-${month}-${day}`;
  const horaFormateada = `${hours}:${minutes}`;

  let Interdependencia = null;

  if(req.body.Interdependencia){
    const Empleado_Intervencion = await nombreEmpleado(req.body.id_empleado_intervencion)
    Interdependencia = {   
      id_Area: Empleado_Intervencion.id_modulo,   
      Area: Empleado_Intervencion.Modulo,
      Id_profesional: req.body.id_empleado_intervencion,
      Nombre_Profesional: Empleado_Intervencion.Nombre + " " + Empleado_Intervencion.Apellido,
      Fecha_notificacion: req.body.Fecha_notificacion
    }
  }

  let Material = null;
  if(req.body.Material){
    Material = {      
      Videos: req.body.Videos,
      Posters: req.body.Posters,
      Juegos: req.body.Juegos,
      Otro: req.body.Otro,
      Cual: req.body.Cual,
      Descripcion: req.body.Descripcion
    }
  }
  
  const Formato = {

    Nombre: Beneficiario[0].p_nombre + " " + Beneficiario[0].s_nombre,
    Apellido: Beneficiario[0].p_apellido + " " + Beneficiario[0].s_apellido,
    Identificacion: Beneficiario[0].id,
    tipo_doc: tipo_doc[0].abreviacion,
    Genero: genero[0].genero,
    Fecha_nacimiento: Beneficiario[0].fecha_nacimiento,
    Edad: Beneficiario[0].edad,
    Sede: sede[0].sede,
    eps: eps[0].eps,

    Estado_civil: req.body.Estado_civil,
    Ocupacion: req.body.Ocupacion,
    Direccion: req.body.Direccion,
    Telefono_beneficiario: req.body.Telefono_beneficiario,
    Aseguradora: req.body.Aseguradora,
    Regimen: req.body.Regimen,
    Nombre_acompanante: req.body.Nombre_acompanante,
    Telefono_acompanante: req.body.Telefono_acompanante,
    Parentesco: req.body.Parentesco,

    Area: Empleado.Modulo,
    Fecha: fechaFormateada,
    Hora: horaFormateada,
    id_beneficiario: req.body.id_beneficiario,
    id_reporte: req.body.id_responsable,
    Nombre_Profesional: Empleado.Nombre + " " + Empleado.Apellido,
    No_Tarjeta_profesional: Empleado.No_Tarjeta_profesional,
    Objetivo_intervencion: req.body.Objetivo_intervencion,
    Desarrollo_intervencion: req.body.Desarrollo_intervencion,
    Interdependencia: Interdependencia,
    Material: Material, 
    Percepcion_beneficiario: req.body.Percepcion_beneficiario,
    Recomendaciones: req.body.Recomendaciones,
    Fecha_proxima_intervencion: req.body.Fecha_proxima_intervencion,
  };
  
  return Formato;

};

exports.postFormat = async (req) => {
  try {

    const formato = await format(req);
    const Empleado = await nombreEmpleado(req.body.id_empleado);

    const Consulta = {
      id_beneficiario: req.body.id_beneficiario,
      id_empleado: req.body.id_empleado,
      id_modulo: Empleado.id_modulo,
      nombre: req.body.nombre,
      hex: JSON.stringify(formato),
      isFormat: true
    };

    const postConsulta = await queries_Beneficiarios.post_consulta(Consulta);
    const result = {
      id: postConsulta[0].id
    };
    const results = []; 
    
    results.push(result);

    return results;
  } catch (error) {
    throw error;
  }
};

exports.postAdjuntos = async (req) => {
  try {
    const storageUrls = await upload(req);
    const storageUrlsString = storageUrls.split(', ');

    const consulta = {
      id_reporte: req.body.id_reporte,
      nombre: req.body.nombre,
      ruta: storageUrlsString[0],
      docType: require('mime-types').lookup(req.file.originalname)
    };
    console.log(consulta);
    const postAdjunto = await queries_Beneficiarios.post_Adjuntos(consulta);
    const results = [{Estado: true}];
    return results;
  } catch (error) {
    throw error;
  }
};



async function getBlobUrl(id) {
  const foto = await queries_General.get_Foto(id);
  return foto;
};

async function streamToBlob(stream) {
  const data = await new Response(stream).arrayBuffer();
  return new Blob([data]);
}


async function downloadBlob(blobServiceClient, containerName, blobName) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const response = await blockBlobClient.download();
    const blob = await streamToBlob(response.readableStreamBody);
    return blob;
  } catch (error) {
    throw error;
  }
}

async function blobToFile(blob, filename) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  buffer.name = filename;
  buffer.type = blob.type;

  return buffer;
};

async function getContainerAndBlobName(url) {

  const urlParts = new URL(url);
  const pathParts = urlParts.pathname.split('/');
  const containerName = pathParts[1];
  const blobName = pathParts.slice(2).join('/');

  return { containerName, blobName };
}


exports.getFoto = async (id) => {
  try {
    const url = await getBlobUrl(id);
    const { containerName, blobName } = await getContainerAndBlobName(url[0].hex);
    const blob = await downloadBlob(blobServiceClient, containerName, blobName);
    const file = await blobToFile(blob, 'filename.jpg');
    return file;
  } catch (error) {
    throw error;
  }
};

exports.getConsultaBuffer = async (info) => {
  try {
    let file;
    if(!info.isFormat){
      const { containerName, blobName } = await getContainerAndBlobName(info.hex);
      const blob = await downloadBlob(blobServiceClient, containerName, blobName);
      file = await blobToFile(blob, blobName);
    }{
      //file = JSON.parse(info.hex);
    }
    return file;
  } catch (error) {
    throw error;
  } 
};

exports.getOrientacionList = async (orientacion) => {
  try {
    const getOrientacionList = await queries_Beneficiarios.get_OrientacionList(orientacion);
    const results = [];
    for (const row of getOrientacionList) {
      const result = {
        id: row.id,
        Values: row.orientacion
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getConsulta = async (list) => {
  try {
    const getConsulta = await queries_Beneficiarios.get_Consultas_url(list);
    const results = [];
    for (const row of getConsulta) {

      const modulo = await queries_General.get_Modulo(row.id_modulo);
      const empleado = await nombreEmpleado(row.id_empleado);

      const result = {
        hex: row.hex,
        docType: row.doctype,
        modulo: modulo[0].modulo,
        id_responsable: row.id_empleado,
        responsable: empleado.Nombre + " " + empleado.Apellido,
        fecha: row.fecha, 
        id: row.id, 
        nombre: row.nombre,
        adjuntos: await getAdjuntos(row.id),
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

async function getAdjuntos(id){
  try {
    const getAdjuntos = await queries_Beneficiarios.get_Adjuntos_url(id);
    const results = [];
    for (const row of getAdjuntos) {

      const result = {
        url: row.hex,
        docType: row.doctype,
        id: row.id, 
        nombre: row.nombre
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

const nombreEmpleado = async (id) => {
  try {
    const nombreEmpleado = await queries_Empleados.get_nombre(id);

    const cargo = await queries_Empleados.get_Cargo(nombreEmpleado[0].id_cargo);
    const modulo = await queries_General.get_Modulo(nombreEmpleado[0].pertenencia_de_modulo);

    const result = {
      id: id.id,
      Nombre: nombreEmpleado[0].p_nombre + " " + nombreEmpleado[0].s_nombre,
      Apellido: nombreEmpleado[0].p_apellido + " " + nombreEmpleado[0].s_apellido,
      No_Tarjeta_profesional: nombreEmpleado[0].tarjeta_profesional,
      Cargo: cargo[0].cargo,
      id_modulo: nombreEmpleado[0].pertenencia_de_modulo, 
      Modulo: modulo[0].modulo
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
    for (const row of getAlergiasList) {
      const result = {
        id: row.id,
        Values: row.alergia
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

exports.deleteMedicamento = async (medicamento) => {
  try {
    const deleteMedicamento = await queries_Beneficiarios.delete_Medicamento(medicamento);
    const results = [];
    results.push(deleteMedicamento);
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

exports.putMedicamento = async (medicamento) => {
  try {
    const putMedicamento = await queries_Beneficiarios.put_Medicamento(medicamento);
    const results = [];
    results.push(putMedicamento);
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

exports.putTrabajadorSocial = async (trabajador_social) => {
  try {
    const putTrabajadorSocial = await queries_Beneficiarios.put_Trabajador_Social(trabajador_social);
    const results = [{Estado : true}];
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putPsicologo = async (psicologo) => {
  try {
    const putPsicologo = await queries_Beneficiarios.put_Psicologo(psicologo);
    const results = [{Estado : true}];
    return results;
  } catch (error) {
    throw error;
  }
};

exports.deleteRegistros = async (info) => {
  try {

    await queries_Beneficiarios.delete_Alergias_all(info.id_persona);
    await queries_Beneficiarios.delete_Diagnostico_all(info.id_persona);
    await queries_Beneficiarios.delete_Medicamento_all(info.id_persona);
    await queries_Beneficiarios.delete_Riesgos_all(info.id_persona);

    const results = [{Estado : true}];
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putTipoDoc = async (tipoDoc) => {
  try {
    const putTipoDoc = await queries_Beneficiarios.put_Tipo_Doc(tipoDoc);
    const results = [];
    results.push(putTipoDoc);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putEps = async (eps) => {
  try {
    const putEps = await queries_Beneficiarios.put_Eps(eps);
    const results = [];
    results.push(putEps);
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

exports.putInfo = async (info) => {
  try {
    const putInfo = await queries_Beneficiarios.put_Info(info);
    const results = [];
    results.push(putInfo);
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


exports.postMedicamento = async (medicamento) => {
  try {
    const postMedicamento = await queries_General.post_Medicamento(medicamento);
    const results = [];
    results.push(postMedicamento);
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


exports.postTipoDoc = async (tipoDoc) => {
  try {
    const postTipoDoc = await queries_General.post_Tipo_Doc(tipoDoc);
    const results = [];
    results.push(postTipoDoc);
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
    const getList = await queries_Beneficiarios.get_DiagnosticoList(diagnostico);
    const results = [];
    for (const row of getList) {
      const result = {
        id: row.id,
        Values: row.enfermedad
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getMedicamentoList = async (medicamento) => {
  try {
    const getMedicamentoList = await queries_Beneficiarios.get_MedicamentoList(medicamento);
    const results = [];
    for (const row of getMedicamentoList) {
      const result = {
        id: row.id,
        Values: row.medicamento
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
    for (const row of getRiesgosList) {
      const result = {
        id: row.id,
        Values: row.riesgo
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getEpsList = async (eps) => {
  try {
    const getEpsList = await queries_General.get_EpsList(eps);
    const results = [];
    for (const row of getEpsList) {
      const result = {
        id: row.id,
        Values: row.eps
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getGeneroList = async (genero) => {
  try {
    const getGeneroList = await queries_General.get_GeneroList(genero);
    const results = [];
    for (const row of getGeneroList) {
      const result = {
        id: row.id,
        Values: row.genero
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getTipoDocList = async (tipoDoc) => {
  try {
    const getTipoDocList = await queries_General.get_Tipo_Doc_List(tipoDoc);
    const results = [];
    for (const row of getTipoDocList) {
      const result = {
        id: row.id,
        Values: row.abreviacion
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
    for (const row of getSedeList) {
      const result = {
        id: row.id,
        Values: row.sede
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

    const sede = await queries_General.get_sede(getPerfil[0].id_sede);
    const orientacion = await queries_General.get_orientacion(+getPerfil[0].id_orientacion);
    const eps = await queries_General.get_eps(getPerfil[0].id_eps);
    const genero = await queries_General.get_genero(getPerfil[0].id_genero);
    const tipo_doc = await queries_General.get_tipo_doc(getPerfil[0].id_tipo_doc);
    const trabajador_social = await nombreEmpleado(getPerfil[0].id_trabajador_social);
    const psicologo = await nombreEmpleado(getPerfil[0].id_psicologo);

    const result = {
      Nombre: getPerfil[0].p_nombre + " " + getPerfil[0].s_nombre,
      Apellido: getPerfil[0].p_apellido + " " + getPerfil[0].s_apellido,
      Identificacion: getPerfil[0].id,
      tipo_doc: tipo_doc[0].abreviacion,
      Genero: genero[0].genero,
      Fecha_nacimiento: getPerfil[0].fecha_nacimiento,
      Edad: getPerfil[0].edad,
      Diagnostico_p: await diagnosticos_principal_beneficiario(id) ?? null,
      Sede: sede[0].sede,
      Fecha_ingreso: getPerfil[0].fecha_ingreso,
      Diagnostico_s: await diagnosticos_secundarios_beneficiario(id) ?? null,
      Riesgos: await riesgos_beneficiario(id) ?? null,
      Alergias: await alergias_beneficiario(id) ?? null,
      Medicamentos: await medicamentos_beneficiario(id) ?? null,
      Orientacion: orientacion[0].orientacion,
      eps: eps[0].eps,
      id_trabajador_social: getPerfil[0].id_trabajador_social,
      trabajador_social: trabajador_social.Nombre + " " + trabajador_social.Apellido,
      id_psicologo: getPerfil[0].id_psicologo, 
      psicologo: psicologo.Nombre + " " + psicologo.Apellido
    };
    results.push(result);
    return results;
  } catch (error) {
    throw error;
  }
};

const medicamentos_beneficiario = async (id) => {
  try {
    const medicamentos = await queries_Beneficiarios.get_medicamentos(id);
    const allMedicamento = [];
    if (medicamentos.length === 0) {

    } else {
      for (const row of medicamentos) {
        const medicamento = await queries_Beneficiarios.get_medicamentos_list(row.id_medicamento);
        const id_empleados = row.id_empleado;
        const empleado = await nombreEmpleado(id_empleados);
        const medicamentos = {
          Id: row.id_medicamento,
          Value: medicamento[0].medicamento,
          Empleado: empleado.Nombre + " " + empleado.Apellido,
          Fecha: row.fecha
        };
        allMedicamento.push(medicamentos);
      }
    }
    return allMedicamento;
  } catch (error) {
    throw error;
  }
};

const diagnosticos_principal_beneficiario = async (id) => {
  const diagnostico_principal = await queries_Beneficiarios.get_diagnostico_principal(id);
  const result = [];
  var getDiagnostico = [];
  if (diagnostico_principal.length === 0) {
    return getDiagnostico;
  }
  getDiagnostico = await queries_Beneficiarios.get_tipos_diagnosticos(+diagnostico_principal[0].id_enfermedad);
  const id_empleados = diagnostico_principal[0].id_empleado;
  const empleado = await nombreEmpleado(id_empleados);
  const diagnostico = {
    Id: diagnostico_principal[0].id_enfermedad,
    Value: getDiagnostico[0].enfermedad,
    Empleado: empleado.Nombre + " " + empleado.Apellido,
    Fecha: diagnostico_principal[0].fecha
  };
  result.push(diagnostico)
  return result;
};

const diagnosticos_secundarios_beneficiario = async (id) => {
  try {
    const diagnosticos_secundarios = await queries_Beneficiarios.get_diagnosticos_secundarios(id);
    var allDiagnosticos = [];
    if (diagnosticos_secundarios.length === 0) {

    } else {
      for (const row of diagnosticos_secundarios) {
        const diagnosticos_secundario = await queries_Beneficiarios.get_tipos_diagnosticos(+row.id_enfermedad);
        const id_empleados = row.id_empleado;
        const empleado = await nombreEmpleado(id_empleados);
        diagnostico = {
          Id: row.id_enfermedad,
          Value: diagnosticos_secundario[0].enfermedad,
          Empleado: empleado.Nombre + " " + empleado.Apellido,
          Fecha: row.fecha
        };
        allDiagnosticos.push(diagnostico);
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
        const id_empleados = row.id_empleado;
        const empleado = await nombreEmpleado(id_empleados);
        const riesgos = {
          Id: row.id_riesgo,
          Value: riesgo[0].riesgo,
          Empleado: empleado.Nombre + " " + empleado.Apellido,
          Fecha: row.fecha
        };
        allRiesgo.push(riesgos);
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
        const id_empleados = row.id_empleado;
        const empleado = await nombreEmpleado(+id_empleados);
        const alergias = {
          Id: row.id_tipo_alergia,
          Value: alergia[0].alergia,
          Empleado: empleado.Nombre + " " + empleado.Apellido,
          Fecha: row.fecha
        };
        allAlergias.push(alergias);
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
    if (camposLlenos) {
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
    result = [];
    const camposLlenos = Object.values(beneficiario).every((value) => value !== undefined && value !== '');
    if (camposLlenos) {
      await queries_Beneficiarios.post_beneficiario(beneficiario)
      result.push({Estado: 'Existoso'});
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
    const preview = [];

    for(const row of getBeneficiarios){

      let diagnostico = await diagnosticos_principal_beneficiario(row.id);
      let riesgos = await riesgos_beneficiario(row.id);

     // console.log(riesgos);

      const result = {
        id: row.id,
        Nombre: row.p_nombre + " " +
          row.s_nombre + " " +
          row.p_apellido + " " +
          row.s_apellido,
        Edad: row.edad,
        id_genero: row.id_genero,
        id_sede: row.id_sede,
        Fecha_ingreso: row.fecha_ingreso,
        id_orientacion: row.id_orientacion,
        riesgos: riesgos ? riesgos: [],
        diagnostico: diagnostico[0]
      };
      preview.push(result);
    }

    let filtredData = preview;

    if (page.EdadIn !== undefined && page.EdadFn !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.Edad >= page.EdadIn && beneficiario.Edad <= page.EdadFn);
    }

    if (page.FecIn !== undefined && page.FecFn !== undefined) {

      const FecInDate = new Date(page.FecIn);
      const FecFnDate = new Date(page.FecFn);

      filtredData = filtredData.filter(beneficiario => {
        const FechaIngresoDate = new Date(beneficiario.Fecha_ingreso);
        return FechaIngresoDate >= FecInDate && FechaIngresoDate <= FecFnDate;
      });
    }


    if (page.Genero !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.id_genero == page.Genero
        );
    }
    
    if (page.Sede !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.id_sede == page.Sede);
    }
    
    if (page.Diagnostico_p !== undefined && filtredData.diagnostico !== undefined ) {
      filtredData = filtredData.filter(beneficiario => beneficiario.diagnostico.Id == page.Diagnostico_p);
    }
    
    if (page.Riesgos !== undefined) {
      filtredData = filtredData.filter(beneficiario => console.log(beneficiario?.riesgos?.Id)/*(beneficiario?.riesgo?.Id)  == page.Riesgos*/);
    }
     
    
    if (page.Orientacion !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.id_orientacion == page.Orientacion);
    }
    

    const remainingRecords = filtredData.length - ((+page.page - 1) * 10);
    const isLastPage = Math.ceil(filtredData.length / 10) === +page.page;
    const recordsToTake = isLastPage ? Math.min(remainingRecords, 10) : 10;

    let firstTenRecords = filtredData.slice((+page.page - 1) * 10, (+page.page - 1) * 10 + recordsToTake);

    const filtrados = {
      Cantidad_filtrada: filtredData.length,
      Numero_de_paginas: Math.ceil(filtredData.length / 10)
    };

    for (const row of firstTenRecords) {

      const sede = await queries_General.get_sede(row.id_sede);
      const ultima_consulta = await queries_Beneficiarios.get_Consultas(row.id);
      const orientacion = await queries_General.get_orientacion(row.id_orientacion);
      const genero = await queries_General.get_genero(row.id_genero);
      let riesgos = await riesgos_beneficiario(row.id);


      let Empleado_ultima_consulta = null;
      let nombreEmpleados = null;
      if (ultima_consulta.length !== 0) {
        Empleado_ultima_consulta = ultima_consulta[0].id_empleado;
        const NombreEmpleados = await nombreEmpleado(+Empleado_ultima_consulta);
        nombreEmpleados = NombreEmpleados.Nombre + " " + NombreEmpleados.Apellido;
      }

      const result = {
        Identificacion: row.id,
        Nombre: row.Nombre,
        Edad: row.Edad,
        Genero: genero[0].genero,
        Diagnostico_p: row.diagnostico ?? null,
        Sede: sede[0].sede,
        Fecha_ingreso: row.Fecha_ingreso,
        Empleado_ultima_consulta: Empleado_ultima_consulta,
        NombreEmpleado: nombreEmpleados,
        Orientacion: orientacion[0].orientacion,
        Riesgos: riesgos ?? null
      };
      results.push(result);
    }
    results.push(filtrados);

    return results;
  } catch (error) {
    throw error;
  }
};

exports.getBeneficiariosDownload = async (page) => {
  try {
    const getBeneficiarios = await queries_Beneficiarios.get_Beneficiarios(page);
    const results = [];
    const preview = [];

    for(const row of getBeneficiarios){

      let diagnostico = await diagnosticos_principal_beneficiario(row.id);
      let riesgos = await riesgos_beneficiario(row.id);

      const result = {
        id: row.id,
        Nombre: row.p_nombre + " " +
          row.s_nombre + " " +
          row.p_apellido + " " +
          row.s_apellido,
        Edad: row.edad,
        id_genero: row.id_genero,
        id_sede: row.id_sede,
        Fecha_ingreso: row.fecha_ingreso,
        id_orientacion: row.id_orientacion,
        riesgo: riesgos,     
        diagnostico: diagnostico
      };
      preview.push(result);
    }

    let filtredData = preview;
    
    if (page.EdadIn !== undefined && page.EdadFn !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.Edad >= page.EdadIn && beneficiario.Edad <= page.EdadFn);
    }

    if (page.FecIn !== undefined && page.FecFn !== undefined) {

      const FecInDate = new Date(page.FecIn);
      const FecFnDate = new Date(page.FecFn);

      filtredData = filtredData.filter(beneficiario => {
        const FechaIngresoDate = new Date(beneficiario.Fecha_ingreso);
        return FechaIngresoDate >= FecInDate && FechaIngresoDate <= FecFnDate;
      });
    }


    if (page.Genero !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.id_genero == page.Genero
        );
    }
    
    if (page.Sede !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.id_sede == page.Sede);
    }
    
    if (page.Diagnostico_p !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.diagnostico.id == page.Diagnostico_p);
    }
    
    if (page.Riesgos !== undefined) {
      filtredData = filtredData.filter(beneficiario => (beneficiario.riesgo.id) == page.Riesgos);
    }
    
    if (page.Orientacion !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.id_orientacion == page.Orientacion);
    }
    

    for (const row of filtredData) {

      const sede = await queries_General.get_sede(row.id_sede);
      const ultima_consulta = await queries_Beneficiarios.get_Consultas(row.id);
      const orientacion = await queries_General.get_orientacion(row.id_orientacion);
      const genero = await queries_General.get_genero(row.id_genero);

      let Empleado_ultima_consulta = null;
      let nombreEmpleados = null;
      if (ultima_consulta.length !== 0) {
        Empleado_ultima_consulta = ultima_consulta[0].id_empleado;
        const NombreEmpleados = await nombreEmpleado(+Empleado_ultima_consulta);
        nombreEmpleados = NombreEmpleados.Nombre + " " + NombreEmpleados.Apellido;
      }

      const result = {
        Identificacion: row.id,
        Nombre: row.Nombre,
        Edad: row.Edad,
        Genero: genero[0].genero,
        Diagnostico_p: row.diagnostico.enfermedad ?? null,
        Sede: sede[0].sede,
        Fecha_ingreso: row.Fecha_ingreso,
        Empleado_ultima_consulta: Empleado_ultima_consulta,
        NombreEmpleado: nombreEmpleados,
        Orientacion: orientacion[0].orientacion,
        Riesgos: row.riesgo.riesgo ?? null
      };
      results.push(result);
    }

    return results;
  } catch (error) {
    throw error;
  }
};


exports.getBeneficiariosGenero = async () => {
  try {
    const getBeneficiariosGenero = await queries_Beneficiarios.get_Beneficiarios_Genero();
    const results = [];
    for (const row of getBeneficiariosGenero) {
      const genero = await queries_General.get_genero(row.id_genero);
      const result = {
        Id: row.id_genero,
        Values: genero[0].genero,
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getBeneficiariosRiesgos = async () => {
  try {
    const getBeneficiariosRiesgos = await queries_Beneficiarios.get_Beneficiarios_Riesgos();
    const results = [];
    for (const row of getBeneficiariosRiesgos) {
      const riesgo = await queries_Beneficiarios.get_riesgos_list(row.id_riesgo);
      const result = {
        Id: row.id_riesgo,
        Values: riesgo[0].riesgo,
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getBeneficiariosOrientacion = async () => {
  try {
    const getBeneficiariosOrientacion = await queries_Beneficiarios.get_Beneficiarios_Orientacion();
    const results = [];
    for (const row of getBeneficiariosOrientacion) {
      const orientacion = await queries_General.get_orientacion(row.id_orientacion);
      const result = {
        Id: row.id_orientacion,
        Values: orientacion[0].orientacion,
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
        Id: row.id_sede,
        Values: sede[0].sede,
      };
      results.push(result);
    }
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
        Id: row.id_enfermedad, 
        Values: diagnostico[0].enfermedad,
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
    const getAniosIng = await queries_Beneficiarios.get_anios_ing();
    const getAniosEgr = await queries_Beneficiarios.get_anios_egr();
    const results = [];

    for (const row of getAniosIng) {
      const anio = row.anio;
      const result = {
        anio: anio
      };
      results.push(result);
    }

    for (const row of getAniosEgr) {
      const anio = row.anio;
      const result = {
        anio: anio
      };
      results.push(result);
    }

    const uniqueResults = Array.from(new Set(results.map(JSON.stringify))).map(JSON.parse);

    return uniqueResults;
  } catch (error) {
    throw error;
  }
};


function ObtenerMes(mes) {
  switch (mes) {
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

    const meses = Array.from({ length: 12 }, (_, i) => i + 1);

    let mesNuevos = [];
    let mesEgresos = [];

    for (let i = 0; i < meses.length; i++) {

      if (getBalanceNuevos.length !== 0) {
        mesNuevos = getBalanceNuevos.filter(element => +element.mes === meses[i]);
      }

      if (getBalanceEgresados.length !== 0) {
        mesEgresos = getBalanceEgresados.filter(element => +element.mes === meses[i]);
      }

      if (mesNuevos.length === 0) {
        mesNuevos = [{
          mes: meses[i],
          count: 0
        }];
      }
      if (mesEgresos.length === 0) {
        mesEgresos = [{
          mes: meses[i],
          count: 0
        }];
      }

      const result = {
        Mes: ObtenerMes(meses[i]),
        Nuevos: +mesNuevos[0].count,
        Egresados: +mesEgresos[0].count
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
        edad: row.edad,
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

      const tipo_doc = await queries_General.get_tipo_doc(id_tipo_doc);
      const sede = await queries_General.get_sede(+id_sede);
      const orientacion = await queries_General.get_orientacion(+id_orientacion);

      let riesgos = await riesgos_beneficiario(row.id);
      let diagnostico = await diagnosticos_principal_beneficiario(row.id)

      const result = {
        id: id,
        tipo_doc: tipo_doc[0].abreviacion,
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        sede: sede[0].sede,
        edad: edad,
        riesgos: riesgos ?? null,
        Diagnostico_p: diagnostico[0] ?? null,
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
    let porcentaje = 100;
    if (+pasado[0].count !== 0) {
      porcentaje = (100 / (+pasado[0].count)) * ((+actual[0].count) - (+pasado[0].count));
    }
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

    let porcentaje = 100;
    if (+pasado[0].count !== 0) {
      porcentaje = (100 / (+pasado[0].count)) * ((+actual[0].count) - (+pasado[0].count));
    }

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

    let porcentaje = 100;
    if (+pasado[0].count !== 0) {
      porcentaje = (100 / (+pasado[0].count)) * ((+actual[0].count) - (+pasado[0].count));
    }

    const result = {
      value: +actual[0].count,
      percentage: Number(porcentaje).toFixed(2)
    };
    return result;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralDiagnosticos = async (diagnostico) => {
  try {
    const putDiagnostico = await queries_General.put_General_Diagnosticos(diagnostico);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralRiesgos = async (riesgo) => {
  try {
    const putDiagnostico = await queries_General.put_General_Riesgos(riesgo);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralMedicamento = async (medicamento) => {
  try {
    const putDiagnostico = await queries_General.put_General_Medicamento(medicamento);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralAlergia = async (alergia) => {
  try {
    const putDiagnostico = await queries_General.put_General_Alergia(alergia);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralEps = async (eps) => {
  try {
    const putDiagnostico = await queries_General.put_General_Eps(eps);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralGenero = async (genero) => {
  try {
    const putDiagnostico = await queries_General.put_General_Genero(genero);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralOrientacion = async (orientacion) => {
  try {
    const putDiagnostico = await queries_General.put_General_Orientacion(orientacion);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralSede = async (sede) => {
  try {
    const putDiagnostico = await queries_General.put_General_Sede(sede);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putGeneralTipoDoc = async (tipo_doc) => {
  try {
    const putDiagnostico = await queries_General.put_General_Tipo_Doc(tipo_doc);
    const results = [];
    results.push(putDiagnostico);
    return results;
  } catch (error) {
    throw error;
  }
};