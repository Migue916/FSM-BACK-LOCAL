// Basic connection
const express = require('express');
const app = express();
const http = require('http');
const db = require('./infraestructure/postgresDB');

// Obtengo las rutas principales
const allRoutes = require('./routes');
const server = http.createServer(app);

require(allRoutes)(app)
    
db.initPoolDB();
app.use(express.json()); // application/json

// Inicializando los headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(allRoutes);
app.use(function (req, res, next) {
    res.status(404).send("Esta ruta no existe.");
});

// RECOMIENDO COLOCAR EL PUERTO EN UNA VARIABLE DE ENTORNO O ARCHIVO .env
// RECOMIENDO COLOCAR EL PUERTO EN UNA VARIABLE DE ENTORNO O ARCHIVO .env
// RECOMIENDO COLOCAR EL PUERTO EN UNA VARIABLE DE ENTORNO O ARCHIVO .env
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servicio corriendo en el puerto ${PORT}`);
});

