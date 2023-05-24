const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de ejemplo',
      version: '1.0.0',
      description: 'Descripción de tu API',
    },
    servers: [
      {
        url: 'backappsantamaria.azurewebsites.net',
      },
    ],
  },
  apis: ['./routes/*.js'], // Indica la ubicación de tus archivos de ruta
};

const specs = swaggerJsdoc(options);

// Usa Swagger UI en la ruta /api-docs
router.use('/', swaggerUi.serve, swaggerUi.setup(specs));
