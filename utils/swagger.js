const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./allRoutes.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Mi API",
        description: "Documentación API"
    },
    host: "backappsantamaria.azurewebsites.net",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Fsm",
            "description": "Endpoints relacionados con los el software para la fundacion santa maria"
        }
    ],
    securityDefinitions: {
        // Configura aquí tus mecanismos de autenticación (JWT, OAuth, etc.) si los utilizas
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./routes/index.js')
})
