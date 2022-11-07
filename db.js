'use strict';
require('dotenv').config();

const { Sequelize } = require('sequelize');

const { readdir } = require('node:fs/promises');
const path = require('node:path');

const modelsPath = path.join(process.cwd(), './src/models');

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } =
  process.env;

// Connection
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
});

// Models registration
(async () => {
  try {
    const files = await readdir(modelsPath);
    for (const file of files) {
      const modulePath = path.join(modelsPath, file);
      require(modulePath)(sequelize);
    }

    const { user, category, record } = sequelize.models;

    // Associations
    user.hasOne(record);
    record.belongsTo(user);

    category.hasOne(record);
    record.belongsTo(category);

    await sequelize.sync({ force: true });
  } catch (err) {
    console.error(err);
  }
})();

module.exports = sequelize;
