const fs = require('fs');
const queries_Beneficiarios = require("../../queries/beneficiarios/beneficiarios_QueriesModule");
const queries_General = require("../../queries/general/general_QueriesModule");
const queries_Empleados = require("../../queries/empleados/empleados_QueriesModule");
const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=cs7100320029bb315a8;AccountKey=9PkVAwI5INo9uZZmOqoFPNN+yoypiOaMbR+q2Wa0zO0Qe4xPlUfv9qfMqzHrO7HU1BJzqnX2fltd+AStYdf8KA==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const { Blob } = require('buffer');
const { fileURLToPath } = require('url');

exports.postFoto = async (req) => {

  const id = req.body.id;

  const containerName = 'profilephotos';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  const blobName = Date.now() + '_' + req.file.originalname;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const options = { blobHTTPHeaders: { blobContentType: 'image/jpeg' } };
  await blockBlobClient.uploadData(req.file.buffer, options);

  const storageUrl = blockBlobClient.url;

  const Foto = {
    id_persona: id,
    ruta: storageUrl,
  };

  try {
    const postFoto = await queries_General.post_Foto(Foto);
    const results = [];
    results.push(results);

    return (results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

async function deleteBlob(containerName, blobName){
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.deleteIfExists();
}

exports.putAdjuntos = async (req) => {

  const storageUrl = upload(req);
  const { containerName, blobName } = await getContainerAndBlobName(req.hex);
  deleteBlob(containerName, blobName);
  
  const Consulta = {
    id_consulta: req.body.id_consulta,
    rutaAnt: req.body.hex,
    rutaNew: storageUrl
  };

  try {
    const putAdjuntos = await queries_Beneficiarios.put_Adjuntos(Consulta);
    const results = [];

    results.push(putAdjuntos);

    return results;
  } catch (error) {
    throw error;
  }
};

exports.putConsulta = async (req) => {

  const storageUrl = upload(req);
  const { containerName, blobName } = await getContainerAndBlobName(req.hex);
  deleteBlob(containerName, blobName);
  
  const Consulta = {
    id_consulta: req.body.id_consulta,
    id_empleado: req.body.id_empleado,
    rutaAnt: req.body.hex,
    rutaNew: storageUrl
  };

  try {
    const putConsulta = await queries_Beneficiarios.put_consulta(Consulta);
    const results = [];

    results.push(results);

    return results;
  } catch (error) {
    throw error;
  }
};

async function upload(req){
  const containerName = 'consultas';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();
  
  const blobName = Date.now() + '_' + req.file.originalname;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
  const options = { blobHTTPHeaders: { blobContentType: req.mimetype } };
  await blockBlobClient.uploadData(req.buffer, options);
  
  return blockBlobClient.url;
}

exports.postConsulta = async (req) => {
  try {

    const storageUrl = upload(req.file);
  
    const Consulta = {
      id_beneficiario: req.body.id_beneficiario,
      id_empleado: req.body.id_empleado,
      id_modulo: req.body.id_modulo,
      nombre: req.body.nombre,
      ruta: storageUrl
    };

    const postConsulta = await queries_Beneficiarios.post_consulta(Consulta);
    const results = {
      id: postConsulta[0].id
    };

    results.push(results);

    return results;
  } catch (error) {
    throw error;
  }
};


exports.postAdjuntos = async (req) => {
  try {
    const storageUrls = await Promise.all(req.files.map(upload));

    const consultas = storageUrls.map((url) => ({
      id_reporte: req.body.id_reporte,
      nombre: req.body.nombre,
      ruta: url,
    }));

    const results = [];

    for (const consulta of consultas) {
      const postAdjunto = await queries_Beneficiarios.post_Adjuntos(consulta);
      results.push(results);
    }

    return results;
  } catch (error) {
    throw error;
  }
};

async function getBlobUrl(id) {
  const foto = await queries_General.get_Foto(id);
  return foto[0].hex;
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
    const { containerName, blobName } = await getContainerAndBlobName(url);
    const blob = await downloadBlob(blobServiceClient, containerName, blobName);
    const file = await blobToFile(blob, 'filename.jpg');
    return file;
  } catch (error) {
    throw error;
  }
};

exports.getConsultaBuffer = async (hex) => {
  try {
    const { containerName, blobName } = await getContainerAndBlobName(hex);
    const blob = await downloadBlob(blobServiceClient, containerName, blobName);
    const file = await blobToFile(blob, blobName);
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
    for (const row of getConsulta) {

      const modulo = await queries_General.get_Modulo(row.id_modulo);
      const empleado = await nombreEmpleado(+row.id_empleado);

      const result = {
        url: row.hex,
        modulo: modulo[0].modulo,
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
    const nombreEmpleado = await queries_Empleados.get_nombre(+id);

    const result = {
      id: id,
      Nombre: nombreEmpleado[0].p_nombre + " " + nombreEmpleado[0].s_nombre,
      Apellido: nombreEmpleado[0].p_apellido + " " + nombreEmpleado[0].s_apellido,
      Cargo: nombreEmpleado[0].id_cargo
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
    for (const row of getDiagnosticoList) {
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

exports.getMedicamentoList = async (medicamento) => {
  try {
    const getMedicamentoList = await queries_Beneficiarios.get_MedicamentoList(medicamento);
    const results = [];
    for (const row of getMedicamentoList) {
      const result = {
        id: row.id,
        medicamento: row.medicamento
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
        riegos: row.riesgo
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
        eps: row.eps
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
        genero: row.genero
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
        tipoDoc: row.abreviacion
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

    const sede = await queries_General.get_sede(getPerfil[0].id_sede);
    const orientacion = await queries_General.get_orientacion(+getPerfil[0].id_orientacion);
    const eps = await queries_General.get_eps(getPerfil[0].id_eps);
    const genero = await queries_General.get_genero(getPerfil[0].id_genero);

    const result = {
      Nombre: getPerfil[0].p_nombre + " " + getPerfil[0].s_nombre,
      Apellido: getPerfil[0].p_apellido + " " + getPerfil[0].s_apellido,
      Identificacion: getPerfil[0].id,
      Genero: genero[0].genero,
      Fecha_nacimiento: getPerfil[0].fecha_nacimiento,
      Edad: getPerfil[0].edad,
      Diagnostico_p: await diagnosticos_principal_beneficiario(id),
      Sede: sede[0].sede,
      Fecha_ingreso: getPerfil[0].fecha_ingreso,
      Diagnostico_s: await diagnosticos_secundarios_beneficiario(id),
      Riesgos: await riesgos_beneficiario(id),
      Alergias: await alergias_beneficiario(id),
      Medicamentos: await medicamentos_beneficiario(id),
      Orientacion: orientacion[0].orientacion,
      eps: eps[0].eps,
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
          medicamentos: medicamento[0].medicamento,
          Empleado: empleado.Nombre + " " + empleado.Apellido,
          Fecha: medicamento[0].fecha
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

  var getDiagnostico = [];
  if (diagnostico_principal.length === 0) {
    return getDiagnostico;
  }
  getDiagnostico = await queries_Beneficiarios.get_tipos_diagnosticos(+diagnostico_principal[0].id_enfermedad);
  const diagnostico = getDiagnostico[0].enfermedad;
  return diagnostico;
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
          diagnosticos_secundario: diagnosticos_secundario[0].enfermedad,
          Empleado: empleado.Nombre + " " + empleado.Apellido,
          Fecha: diagnosticos_secundario[0].fecha
        };
        allDiagnosticos.push(diagnostico);
      }
    }
    console.log(allDiagnosticos);
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
          riesgos: riesgo[0].riesgo,
          Empleado: empleado.Nombre + " " + empleado.Apellido,
          Fecha: riesgo[0].fecha
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
          alergias: alergia[0].alergia,
          Empleado: empleado.Nombre + " " + empleado.Apellido,
          Fecha: alergia[0].fecha
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
    const camposLlenos = Object.values(beneficiario).every((value) => value !== undefined && value !== '');
    if (camposLlenos) {
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
      const genero = await queries_General.get_genero(row.id_genero);

      let Empleado_ultima_consulta = null;
      let nombreEmpleados = null;
      if (ultima_consulta.length !== 0) {
        Empleado_ultima_consulta = ultima_consulta[0].id_empleado;
        const NombreEmpleados = await nombreEmpleado(+Empleado_ultima_consulta);
        nombreEmpleados = NombreEmpleados.Nombre + " " + NombreEmpleados.Apellido;
      }

      let riesgos = await riesgos_beneficiario(row.id);
      if (riesgos.length === 0) {
        riesgos = null;
      }

      let diagnostico = await diagnosticos_principal_beneficiario(row.id);
      if (diagnostico.length === 0) {
        diagnostico = null;
      }

      const result = {
        Identificacion: row.id,
        Nombre: row.p_nombre + " " +
          row.s_nombre + " " +
          row.p_apellido + " " +
          row.s_apellido,

        Edad: row.edad,
        Genero: genero[0].genero,
        Diagnostico_p: diagnostico,
        Sede: sede[0].sede,
        Fecha_ingreso: row.fecha_ingreso,
        Empleado_ultima_consulta: Empleado_ultima_consulta,
        NombreEmpleado: nombreEmpleados,
        Orientacion: orientacion[0].orientacion,
        Riesgos: riesgos
      };
      results.push(result);
    }
    let filtredData = results;

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
      filtredData = filtredData.filter(beneficiario => beneficiario.Genero === page.Genero);
    }
    if (page.Sede !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.Sede === page.Sede);
    }
    if (page.Diagnostico_p !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.Diagnostico_p === page.Diagnostico_p);
    }
    if (page.Riesgos !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.Riesgos === page.Riesgos);
    }
    if (page.Orientacion !== undefined) {
      filtredData = filtredData.filter(beneficiario => beneficiario.Orientacion === page.Orientacion);
    }

    const remainingRecords = filtredData.length % 10;
    const isLastPage = Math.ceil(filtredData.length / 10) === +page.page;
    const recordsToTake = isLastPage ? Math.min(remainingRecords, 10) : 10;

    let firstTenRecords;
    if (remainingRecords !== 0) {
      firstTenRecords = filtredData.slice((+page.page - 1) * 10, (+page.page - 1) * 10 + recordsToTake);
    } else {
      firstTenRecords = filtredData.slice((+page.page * 10) - 10, (+page.page) * 10);
    }

    const filtrados = {
      Cantidad_filtrada: filtredData.length,
      Numero_de_paginas: filtredData.length / 10
    };

    firstTenRecords.push(filtrados);

    return firstTenRecords;
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
        Genero: genero[0].genero,
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
        Riesgo: riesgo[0].riesgo,
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
        Orientacion: orientacion[0].orientacion,
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
    results.push({ sede: "No_registra", });
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

      const tipo_doc = await queries_General.get_tipo_doc(+id_tipo_doc);
      const sede = await queries_General.get_sede(+id_sede);
      const orientacion = await queries_General.get_orientacion(+id_orientacion);

      let riesgos = await riesgos_beneficiario(row.id);
      if (riesgos.length === 0) {
        riesgos = null;
      }

      let diagnostico = await diagnosticos_principal_beneficiario(row.id)
      if (diagnostico.length === 0) {
        diagnostico = null;
      }

      const result = {
        id: id,
        tipo_doc: tipo_doc[0].abreviacion,
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        sede: sede[0].sede,
        edad: edad,
        riesgos: riesgos,
        Diagnostico_p: diagnostico,
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
    if (pasado.length !== 0) {
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
    if (pasado.length !== 0) {
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
    if (pasado.length !== 0) {
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
