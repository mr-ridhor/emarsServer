const Sequelize = require('sequelize');
require('dotenv').config();
const dbConfig = require('../config/DB.js');

const sequelize = new Sequelize(`mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);

const User = require('./usersModel')(sequelize, Sequelize);

module.exports = {
  sequelize,
  User
};
