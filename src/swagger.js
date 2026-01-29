const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config()

const swaggerSpec = swaggerJsdoc({
 definition: {
  openapi: '3.0.0',
  info: {
    title: 'Auth & Authorization Service',
    version: '1.0.0',
    description: 'Backend authentication service (JWT based)',
  },
  servers: [
    {
      url: process.env.API_URL,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
},
  apis: ['./src/routes/*.js'],
});

module.exports = swaggerSpec;