const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/chat', {
    logging: false,
  })

module.exports = db