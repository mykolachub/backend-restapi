'use strict';

const { Sequelize } = require('sequelize');

const { readdir } = require('node:fs/promises');
const path = require('node:path');

const modelsPath = path.join(process.cwd(), './src/models');

// Connection
const sequelize = new Sequelize('backend_restapi', 'postgres', 'root', {
  host: 'localhost',
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
