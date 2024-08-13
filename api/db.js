const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('postgres://postgres:123@localhost:25432/db22')
module.exports = { sequelize }