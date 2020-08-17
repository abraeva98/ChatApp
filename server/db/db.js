const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/chat')

module.exports = db