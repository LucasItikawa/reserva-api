const { Sequelize } = require("sequelize");

// Conexão usando a URL fornecida pelo Railway
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false, // Desativa logs do SQL
});

// Teste de conexão
sequelize
  .authenticate()
  .then(() => console.log("Conexão bem-sucedida com o banco de dados!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

module.exports = sequelize;
