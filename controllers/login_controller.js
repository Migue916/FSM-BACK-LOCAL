const response = require("./responses/response");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const queries_General = require("../infraestructure/queries/general/general_QueriesModule");

exports.ingresar = async (req, res, next) => {
  try {
    var result = {
      status: true,
      message: "successful",
    };

    const originalUser = {
      email: req.body.email,
      contrasena: req.body.contrasena,
    };
    console.log(originalUser);

    var todosLosCamposLlenos = Object.values(originalUser).every((value) => value !== undefined && value !== '');
    if (todosLosCamposLlenos) {   
      const getUser = await queries_General.get_user(originalUser.email);
      todosLosCamposLlenos =  getUser.length > 0;
      console.log(todosLosCamposLlenos);
      if(todosLosCamposLlenos){
        const isPasswordValid = await bcrypt.compare(originalUser.contrasena, getUser[0].contrasena);
        if (isPasswordValid){
          jwt.sign({getUser}, '!@#$%&/()=?¡*', {expiresIn: '60s'}, (err, token) =>{
            res.json({
              token, 
              id: getUser[0].id,
              Tipo_usuario: getUser[0].cargo, 
              });
            });
        }else{       
          result = {
            status: false,
            message: "Contraseña incorrecta",
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
  verifyToken();
  try {
    console.log("Salt: ", saltRounds);
    console.log("Contraseña: ", req.body.contrasena);
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

exports.acceso = async (req, res, next) => {
  let result = [];
  try{
    verifyToken();
    result = {
      status: true
    };
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

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    jwt.verify(req.token, '!@#$%&/()=?¡*', (error) => {
      if(error){
        res.sendStatus(403);
      }else{
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}