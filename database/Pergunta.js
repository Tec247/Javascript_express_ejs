const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas', {
titulo:{
  type: Sequelize.STRING,
  allowNull: false,
  notNull: true
},
descricao:{
  type: Sequelize.TEXT,
  allowNull: false,
  notNull: true
}
});
Pergunta.sync({force:false}).then(() =>{});
module.exports = Pergunta;