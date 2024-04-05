const { Sequelize } = require("sequelize");
const defineUserModel = require("./modelsDB/User.js");

const sequelize = new Sequelize(
  "postgres://postgres:sarachaga4632@localhost/theagency"
);

const User = defineUserModel(sequelize);

module.exports = { conn: sequelize, User };
