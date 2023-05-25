const express = require('express');
const allRoutes = express.Router();
const jwt = require('jsonwebtoken');

const beneficiariosRoutes = require("./beneficiariosRoutes");
const empleadosRoutes = require("./empleadosRoutes");
const loginRoute = require("./loginRoute");
const accesoRoutes = require("./accesoRoutes");

allRoutes.use("/beneficiarios", verifyToken, beneficiariosRoutes);
allRoutes.use("/empleados", verifyToken, empleadosRoutes);
allRoutes.use("/acceso", verifyToken, accesoRoutes);
allRoutes.use("/login", loginRoute);

module.exports = allRoutes;

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
  
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      jwt.verify(req.token, 'S3cr3tK3yF$M', (error) => {
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
  