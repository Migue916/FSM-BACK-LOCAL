const response = require("./responses/response");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const queries_General = require("../infraestructure/queries/general/general_QueriesModule");

exports.ingresar = async (req, res, next) => {
  try {
    const result = {
      status: true,
      message: "successful",
    };

    const originalUser = {
      email: req.body.email,
      contrasena: req.body.contrasena,
    };

    const getUser = await queries_General.get_user(originalUser.email);
    const isPasswordValid = await bcrypt.compare(originalUser.contrasena, getUser[0].contrasena);

    if (isPasswordValid){
      jwt.sign({getUser}, 'secretKey', {expiresIn: '10h'}, (err, token) =>{
        res.json({
          token, 
          id: getUser[0].id, 
          });
        });
    }else{       
      const result = {
        status: false,
        message: "Contraseña incorrecta",
      };
      response.error(req, res, result, 400, "error");
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
  let result;
  try {
    console.log("Salt: ", saltRounds);
    const employee = {
      id: req.body.id,
      id_tipo_doc: req.body.id_tipo_doc,
      p_nombre: req.body.p_nombre,
      s_nombre: req.body.s_nombre,
      p_apellido: req.body.p_apellido,
      s_apellido: req.body.s_apellido,
      id_profesion: req.body.id_profesion,
      tarjeta_profesional: req.body.tarjeta_profesional,
      id_cargo: req.body.id_cargo,
      activo: req.body.activo,
      id_genero: req.body.id_genero,
      pertenencia_de_modulo: req.body.pertenencia_de_modulo,
      email: req.body.email,
      contrasena: await bcrypt.hash(req.body.contrasena, saltRounds),
      cargo: req.body.cargo,
    };
    console.log(employee);
    const todosLosCamposLlenos = Object.values(employee).every((value) => value !== undefined && value !== '');
    if (todosLosCamposLlenos) {
      await queries_General.create_user(employee);
      await queries_General.create_user_account(employee);
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
  } catch (error) {
    console.error(error.message);
    result = {
      status: false,
      message: error.message,
    };
    response.error(req, res, result, 400, "error");
  }
};

