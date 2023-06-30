const queries_Empleados = require("../../queries/empleados/empleados_QueriesModule");
const queries_Beneficiarios = require("../../queries/beneficiarios/beneficiarios_QueriesModule");
const queries_General = require("../../queries/general/general_QueriesModule");
const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=cs7100320029bb315a8;AccountKey=9PkVAwI5INo9uZZmOqoFPNN+yoypiOaMbR+q2Wa0zO0Qe4xPlUfv9qfMqzHrO7HU1BJzqnX2fltd+AStYdf8KA==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const { Blob } = require('buffer');

exports.getEmpleadosPorCargo = async (info) => {
  try { 
    
    const getEmpleados = await queries_Empleados.get_Empleados_Por_Cargo(info);
    const results = [];

    for (const row of getEmpleados) { 

      const cargo = await queries_Empleados.get_Cargo(row.id_cargo);
      const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);
      const genero = await queries_General.get_genero(row.id_genero);


      const result = {
        Nombre: row.p_nombre + " " +
                row.s_nombre + " " +
                row.p_apellido + " " +
                row.s_apellido,

        Identificacion: row.id,
        Genero: genero[0].genero,
        Cargo: cargo[0].cargo,
        Modulo: modulo[0].modulo,
      };
      results.push(result);
    }
    var filtredData = results;

    if (info.Cargo !== undefined){
      filtredData = filtredData.filter(filtredData => filtredData.Cargo === info.Cargo);
    }
    if (info.Modulo !== undefined){
      filtredData = filtredData.filter(filtredData => filtredData.Modulo === info.Modulo);
    }

    return filtredData;
  } catch (error) {
    throw error;
  }
};


exports.getEmpleadosLastTen = async () => {
  try { 
    
    const getEmpleadosLastTen = await queries_Empleados.get_Empleados_LastTen();
    const results = [];

    for (const row of getEmpleadosLastTen) { 

      const consultas = await queries_Empleados.get_Consultas(row.id);
      const cargo = await queries_Empleados.get_Cargo(row.id_cargo);
      const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);
      const genero = await queries_General.get_genero(row.id_genero);

      if (consultas.length === 0){
        consultas.push(
          {
            cant:"0"
          }
        )
    }

      const result = {
        Nombre: row.p_nombre + " " +
                row.s_nombre + " " +
                row.p_apellido + " " +
                row.s_apellido,

        Identificacion: row.id,
        Edad: row.edad,
        Genero: genero[0].genero,
        Consultas_realizadas: consultas[0].cant,
        Cargo: cargo[0].cargo,
        Modulo: modulo[0].modulo,
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getEmpleados = async (page) => {
  try { 
    
    const getEmpleados = await queries_Empleados.get_Empleados(page);
    const results = [];

    for (const row of getEmpleados) { 

      const consultas = await queries_Empleados.get_Consultas(row.id);
      const cargo = await queries_Empleados.get_Cargo(row.id_cargo);
      const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);
      const genero = await queries_General.get_genero(row.id_genero);
      const profesion = await queries_General.get_profesion(row.id_profesion);
      const tipo_doc = await queries_General.get_tipo_doc(row.id_tipo_doc);


      if (consultas.length === 0){
        consultas.push(
          {
            cant:"0"
          }
        )
    }

      const result = {
        Nombre: row.p_nombre + " " +
                row.s_nombre + " " +
                row.p_apellido + " " +
                row.s_apellido,

        Identificacion: row.id,
        Tipo_doc: tipo_doc[0].abreviacion,
        Genero: genero[0].genero,
        Edad: row.edad,
        Profesion: profesion[0].profesion,
        Consultas_realizadas: consultas[0].cant,
        Cargo: cargo[0].cargo,
        Modulo: modulo[0].modulo,
      };
      results.push(result);
    }
    var filtredData = results;

    if (page.EdadIn !== undefined && page.EdadFn !== undefined) {
      filtredData = filtredData.filter(empleado => empleado.Edad >= page.EdadIn && empleado.Edad <= page.EdadFn);
    }

    if (page.Cargo !== undefined){
      filtredData = filtredData.filter(empleado => empleado.Cargo === page.Cargo);
    }
    if (page.Modulo !== undefined){
      filtredData = filtredData.filter(empleado => empleado.Modulo === page.Modulo);
    }
    if (page.ConsultasIn !== undefined && page.ConsultasFn !== undefined) {
      filtredData = filtredData.filter(empleado => 
        empleado.Consultas_realizadas >= page.ConsultasIn && empleado.Consultas_realizadas <= page.ConsultasFn
      );
    }
    if (page.Genero !== undefined) {
      filtredData = filtredData.filter(empleado => empleado.Genero === page.Genero);
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

    return(firstTenRecords);

  } catch (error) {
    throw error;
  }
};


exports.nombreEmpleado = async(id) =>{
  try { 

    const nombreEmpleado = await queries_Empleados.get_nombre(id);
    const cargo = await queries_Empleados.get_Cargo(nombreEmpleado[0].id_cargo);
    const modulo = await queries_General.get_Modulo(nombreEmpleado[0].pertenencia_de_modulo);

    const result = {
      id: id.id,
      Nombre: nombreEmpleado[0].p_nombre + " " + nombreEmpleado[0].s_nombre,
      Apellido: nombreEmpleado[0].p_apellido + " " + nombreEmpleado[0].s_apellido,
      Cargo: cargo[0].cargo, 
      Modulo: modulo[0].modulo
    };
    
    return result;
} catch (error) {
  throw error;
}
};

exports.getEmpleadosPorNombre = async (nombre) => {
  try {

      getEmpleado = await queries_Empleados.get_EmpleadosPorNombre(nombre);
      const results = [];

    for (const row of getEmpleado) {

      const cant = await queries_Empleados.get_Consultas(row.id);
      const cargo = await queries_Empleados.get_Cargo(row.id_cargo);
      const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);
      const genero = await queries_General.get_genero(row.id_genero);

      if (cant.length === 0){
          cant.push(
            {
              cant:"0"
            }
          )
      }
      const result = {
        Empleado: row.p_nombre + " " +
                  row.s_nombre + " " +
                  row.p_apellido + " " +
                  row.s_apellido,
        Identificacion: row.id,
        Genero: genero[0].genero,
        Cargo: cargo[0].cargo,
        Modulo: modulo[0].modulo,
        Consultas: cant[0].cant,
      };
      
      results.push(result);

      };
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getEmpleadosModulo = async () => {
    try {
      
      const estadistica = 
        await queries_Empleados.get_EmpleadosModulo();

        const results = [];

      for (const row of estadistica) {
        const id_modulo = row.pertenencia_de_modulo;
        const cant = row.cant;

        const modulo = await queries_General.get_Modulo(id_modulo);

        const result = {
          modulo: modulo[0].modulo,
          cantidad: cant,
            };
        
        results.push(result);

        };
      return results;
    } catch (error) {
      throw error;
    }
  };

exports.getEmpleadosGenero = async () => {
    try {
      
      const estadistica = 
        await queries_Empleados.get_EmpleadosGeneros();

      const Masculino = +estadistica[0].masculino;
      const Femenino = +estadistica[0].femenino;
        
      const result = {
        Masculino: Masculino,
        Femenino: Femenino, 
        Total: Masculino + Femenino
      };
      return result;
    } catch (error) {
      throw error;
    }
  };

exports.getEmpleadosActuales = async () => {
    try {

      const actual =
        await queries_Empleados.get_EmpleadosActuales();
      const pasado =
        await queries_Empleados.get_EmpleadosActualesPasado();

      let porcentaje = 100;
      if(pasado.length !== 0){
        porcentaje = (100 / (+pasado[0].count)) * ((+actual[0].count) - (+pasado[0].count));
      }
  
      const result = {
        value: +actual[0].count,
        percentage: porcentaje
      };
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  exports.getEmpleadosEgresados = async () => {
    try {
      const actual =
        await queries_Empleados.get_EmpleadosEgresados();
      const pasado =
        await queries_Empleados.get_EmpleadosEgresadosPasado();
        
      let porcentaje = 100;
      if(pasado.length !== 0){
        porcentaje = (100 / (+pasado[0].count)) * ((+actual[0].count) - (+pasado[0].count));
      }
        const result = {
          value: +actual[0].count,
          percentage: porcentaje
        };
      return result;
    } catch (error) {
      throw error;
    }
  };

  exports.getEmpleadosCargos = async () => {
    try { 
      const getEmpleadosCargos = await queries_Empleados.get_EmpleadosCargos();
        const results = [];
          for (const row of getEmpleadosCargos) { 
            const cargo = await queries_Empleados.get_Cargo(row.id_cargo);  
            const result = {
              cargos: cargo[0].cargo,
            };
            results.push(result);
          }
          return results;
  } catch (error) {
    throw error;
  }
  };

  exports.getEmpleadosModulos = async () => {
    try { 
      const getEmpleadosModulos = await queries_Empleados.get_EmpleadosModulos();
        const results = [];
          for (const row of getEmpleadosModulos) { 
            const modulo = await queries_General.get_Modulo(row.pertenencia_de_modulo);
            const result = {
              modulos: modulo[0].modulo,
            };
            results.push(result);
          }
          return results;
  } catch (error) {
    throw error;
  }
  };

  exports.getEmpleadosGeneros = async () => {
    try { 
      const getEmpleadosGeneros = await queries_Empleados.get_Empleados_Generos();
        const results = [];
          for (const row of getEmpleadosGeneros) { 
            const genero = await queries_General.get_genero(row.id_genero);
            const result = {
              generos: genero[0].genero,
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
    const getPerfil = await queries_Empleados.get_Perfil(id);
      const results = [];

      const consultas = await queries_Empleados.get_Consultas(id);
      const cargo = await queries_Empleados.get_Cargo(getPerfil[0].id_cargo);
      const modulo = await queries_General.get_Modulo(getPerfil[0].pertenencia_de_modulo);
      const genero = await queries_General.get_genero(getPerfil[0].id_genero);
      const user = await queries_Empleados.get_Tipo_Cargo(id);
      const tipo_doc = await queries_General.get_tipo_doc(getPerfil[0].id_tipo_doc);
      const profesion = await queries_General.get_profesion(getPerfil[0].id_profesion);


      if (consultas.length === 0){
        consultas.push(
          {
            cant:"0"
          }
        )
      }
      const result = {
          Nombre: getPerfil[0].p_nombre + " " + getPerfil[0].s_nombre,
          Apellido: getPerfil[0].p_apellido + " " + getPerfil[0].s_apellido,
          Identificacion: getPerfil[0].id,
          tipo_doc: tipo_doc[0].abreviacion,
          Genero: genero[0].genero,
          Fecha_nacimiento: getPerfil[0].fecha_nacimiento,
          Edad: getPerfil[0].edad,
          Fecha_ingreso: getPerfil[0].fecha_ingreso, 
          Num_consultas: consultas[0].cant,
          Cargo: cargo[0].cargo, 
          Modulo: modulo[0].modulo,
          Profesion: profesion[0].profesion,
          Admin: user[0].cargo
        };   
        results.push(result);
        return results;
} catch (error) {
  throw error;
}
};

exports.putEgreso = async (egreso) => {
  try {
    const camposLlenos = Object.values(egreso).every((campo) => campo !== null && campo !== undefined);
    if (camposLlenos) {
      await queries_Empleados.put_Empleado(egreso);
      await queries_Empleados.post_Egreso(egreso);
    }
    else
      res.status(400);
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

exports.getModulosList = async (modulo) => {
  try {
    const getModulosList = await queries_Empleados.get_ModulosList(modulo);
    const results = [];
    for (const row of getModulosList) {
      const result = {
        id: row.id,
        Values: row.modulo
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getCargosList = async (cargo) => {
  try {
    const getCargosList = await queries_Empleados.get_CargosList(cargo);
    const results = [];
    for (const row of getCargosList) {
      const result = {
        id: row.id,
        Values: row.cargo
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getProfesionList = async (profesion) => {
  try {
    const getProfesionList = await queries_Empleados.get_ProfesionList(profesion);
    const results = [];
    for (const row of getProfesionList) {
      const result = {
        id: row.id,
        Values: row.profesion
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putEmpleadoModulo = async (modulo) => {
  try {
    const putEmpleadoModulo = await queries_Empleados.put_EmpleadoModulo(modulo);
    const results = [];
    results.push(results);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putEmpleadoCargo = async (cargo) => {
  try {
    const putEmpleadoCargo = await queries_Empleados.put_EmpleadoCargo(cargo);
    const results = [];
    results.push(results);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putEmpleadoProfesion = async (profesion) => {
  try {
    const putEmpleadoProfesion = await queries_Empleados.put_Empleado_Profesion(profesion);
    const results = [];
    results.push(results);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putEmpleadoTipoAdmin = async (tipoAdmin) => {
  try {
    const putEmpleadoTipoAdmin = await queries_Empleados.put_Empleado_Tipo_Admin(tipoAdmin);
    const results = [];
    results.push(results);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.putInfo = async (info) => {
  try {
    const putInfo = await queries_Empleados.put_Info(info);
    const results = [];
    results.push(putInfo);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getConsulta = async (list) => {
  try {
    const getConsulta = await queries_Empleados.get_Consultas_url(list);
    const results = [];
    for (const row of getConsulta) {

      const modulo = await queries_General.get_Modulo(row.id_modulo);
      const empleado = await nombreBeneficiario(row.id_beneficiario);

      const result = {
        hex: row.hex,
        modulo: modulo[0].modulo,
        id_beneficiario: row.id_beneficiario,
        beneficiario: empleado.Nombre + " " + empleado.Apellido,
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


const nombreBeneficiario = async (id) => {
  try {
    const nombreBeneficiario = await queries_Beneficiarios.get_nombre(id);
    const tipo_doc = await queries_General.get_tipo_doc(nombreBeneficiario[0].id_tipo_doc);

    const result = {
      id: id,
      Nombre: nombreBeneficiario[0].p_nombre + " " + nombreBeneficiario[0].s_nombre,
      Apellido: nombreBeneficiario[0].p_apellido + " " + nombreBeneficiario[0].s_apellido,
      Edad: nombreBeneficiario[0].edad,
      Tipo_doc: tipo_doc[0].abreviacion
    };

    return result;
  } catch (error) {
    throw error;
  }
};

exports.getBeneficiariosUltimoMes = async (id) => {
  try {
    const getBeneficiariosUltimoMes = await queries_Empleados.get_Beneficiarios_Ultimo_Mes(id);
    const results = [];
    for (const row of getBeneficiariosUltimoMes) {

      const modulo = await queries_General.get_Modulo(row.id_modulo);
      const empleado = await nombreBeneficiario(row.id_beneficiario);

      const result = {
        hex: row.hex,
        modulo: modulo[0].modulo,
        id_beneficiario: row.id_beneficiario,
        beneficiario: empleado.Nombre + " " + empleado.Apellido,
        edad: empleado.Edad,
        fecha: row.fecha, 
        id: row.id, 
        nombre: row.nombre,
        isFormat: row.isFormat,
        adjuntos: await getAdjuntos(row.id),
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.postModulo = async (modulo) => {
  try {
    const postModulo = await queries_General.post_Modulo(modulo);
    const results = [];
    results.push(postModulo);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.postCargo = async (cargo) => {
  try {
    const postCargo = await queries_General.post_Cargo(cargo);
    const results = [];
    results.push(postModulo);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.postProfesion = async (profesion) => {
  try {
    const postProfesion = await queries_General.post_Profesion(profesion);
    const results = [];
    results.push(postModulo);
    return results;
  } catch (error) {
    throw error;
  }
};