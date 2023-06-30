const response = require("./responses/response");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const queries_General = require("../infraestructure/queries/general/general_QueriesModule");
const empleadosServices = require("../infraestructure/services/empleados.services/empleados_service");

exports.ingresar = async (req, res, next) => {
  try {
    var result = {
      status: true,
      message: "successful",
    };

      const originalUser = {
        email: req.body.correo,
        contrasena: req.body.contrasena,
      };

    var todosLosCamposLlenos = Object.values(originalUser).every((value) => value !== undefined && value !== '');

    if (todosLosCamposLlenos) {   

      const getUser = await queries_General.get_user(originalUser.email);
      todosLosCamposLlenos =  getUser.length > 0;

      if(todosLosCamposLlenos){

        const isPasswordValid = await bcrypt.compare(originalUser.contrasena, getUser[0].contrasena);

        if (isPasswordValid){
          const empleado = await empleadosServices.nombreEmpleado(getUser[0].id);
          jwt.sign({getUser}, 'S3cr3tK3yF$M', {expiresIn: '10h'}, (err, token) =>{
            res.json({
                id: getUser[0].id,
                Administrador: getUser[0].cargo, 
                Modulo: empleado.Modulo,
                token 
              });
            });

        }else{     
            
          result = {
            status: false,
            message: "Contrasena incorrecta",
          };
          response.error(req, res, result, 400, "error");
        }
      }else{
        result = {
          status: false,
          message: "Correo incorrecto",
        };
        response.error(req, res, result, 400, "error");
      }
    } else {
      res.status(400);
      result = {
        status: false,
        message: "Faltan campos por llenar",
      };
      res.send(result);
    }
  } catch (error) {
    const result = {
      status: false,
      message: error.message,
    };
    console.error(error.message);
    response.error(req, res, result, 400, "error");
  }
};


exports.user_create = async (req, res, next) => {
  let result = [];
  try {
    const employee = {
      id: req.body.id,
      id_tipo_doc: req.body.id_tipo_doc,
      p_nombre: req.body.p_nombre,
      s_nombre: req.body.s_nombre,
      p_apellido: req.body.p_apellido,
      s_apellido: req.body.s_apellido,
      id_profesion: req.body.id_profesion,
      tarjeta_profesional: req.body.tarjeta_profesional,
      fecha_nacimiento: req.body.fecha_nacimiento,
      id_cargo: req.body.id_cargo,
      activo: req.body.activo,
      id_genero: req.body.id_genero,
      pertenencia_de_modulo: req.body.pertenencia_de_modulo,
      email: req.body.email,
      contrasena: await bcrypt.hash(req.body.contrasena, saltRounds),
      cargo: req.body.cargo,
    };
    const todosLosCamposLlenos = Object.values(employee).every((value) => value !== undefined && value !== '');
    if (todosLosCamposLlenos) {
      const creacionUser = false;
      creacionUser = await queries_General.create_user(employee);
      if(creacionUser){
        await queries_General.create_user_account(employee);
      }else{
        res.status(400);
        result = {
          status: false,
          message: "Error algun valor ya existe",
        };
        res.send(result)
      }
      result = {
        status: true,
        message: "successful",
      };
    } else {
      res.status(400);
      result = {
        status: false,
        message: "Faltan campos por llenar",
      };
      res.send(result);
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    console.error(error.message);
    result = {
      status: false,
      message: error.message,
    };
    response.error(req, res, result, 400, "error");
  }
};


exports.new_Password = async (req, res, next) => {
  let result = [];
  try {
    const employee = {
      email: req.body.email,
      contrasena: await bcrypt.hash(req.body.contrasena, saltRounds)
    };
    const todosLosCamposLlenos = Object.values(employee).every((value) => value !== undefined && value !== '');

    if (todosLosCamposLlenos) {

      const getUser = await queries_General.get_user(originalUser.email);
      user =  getUser.length > 0;

      if(user){
        await queries_General.new_Password(employee);
      }
      result = {
        status: true,
        message: "successful",
      };

    } else {
      res.status(400);
      result = {
        status: false,
        message: "Faltan campos por llenar",
      };
      res.send(result);
    }
    response.success(req, res, result, 200, "success");
  } catch (error) {
    console.error(error.message);
    result = {
      status: false,
      message: error.message,
    };
    response.error(req, res, result, 400, "error");
  }
};