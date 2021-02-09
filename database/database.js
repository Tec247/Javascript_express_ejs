const Sequelize = require("sequelize");
const connection = new Sequelize('guiaperguntas','root','jean',{
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;
