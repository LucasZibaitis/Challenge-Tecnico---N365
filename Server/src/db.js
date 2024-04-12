const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const HOSTNAME = "dpg-coc4lg63e1ms73aukncg-a";
const PORT = 5432;
const DATABASE = "theagency";
const USERNAME = "theagency_user";
const PASSWORD = "cnFsLr4qMxKHebIkSaIue3AjQhjtmHya";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOSTNAME,
  port: PORT,
  dialect: "postgres",
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/modelsDB"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/modelsDB", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Payment } = sequelize.models;

User.hasMany(Payment, { as: "payments" });
Payment.belongsTo(User);

module.exports = { conn: sequelize, User, Payment };
