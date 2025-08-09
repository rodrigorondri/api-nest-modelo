require('ts-node/register');
require('dotenv').config();  

const { databaseConfig } = require('../../config/database.config');

module.exports = {
  development: {
    ...databaseConfig
  }
};
