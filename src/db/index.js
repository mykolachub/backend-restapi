'use strict';
require('dotenv').config();

const { Sequelize } = require('sequelize');
const associations = require('./associations');

const { readdir } = require('node:fs/promises');
const path = require('node:path');

const modelsPath = path.join(process.cwd(), './src/models');

const { CONNECTION_STRING } = process.env;

// Connection
const sequelize = new Sequelize(CONNECTION_STRING, { logging: false });

// Models registration
(async () => {
  try {
    const files = await readdir(modelsPath);
    for (const file of files) {
      const modulePath = path.join(modelsPath, file);
      require(modulePath)(sequelize);
    }

    // Associations between models
    associations(sequelize);

    await sequelize.sync({ force: true });
  } catch (err) {
    console.error(err);
  }
})();

module.exports = sequelize;
