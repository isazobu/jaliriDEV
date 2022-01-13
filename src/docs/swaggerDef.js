const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'JALIRI API documentation',
    version,
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

module.exports = swaggerDef;
