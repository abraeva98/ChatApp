const db = require('./db');
const { Sequelize } = db;

const User = db.define('user', {
    name: Sequelize.STRING,
    password: Sequelize.STRING
})

module.exports = User;