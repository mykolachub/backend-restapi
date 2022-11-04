'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('backend_restapi', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
