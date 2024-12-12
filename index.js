require("dotenv").config(); // Carregar variáveis de ambiente do .env
const express = require("express"); // Importar o Express
const cors = require("cors"); // Importar o CORS
const db = require("./models"); // Importar os modelos e a configuração do Sequelize
const routes = require("./routes"); // Importar as rotas

// Criar a aplicação Express
const app = express();

// Configuração do middleware CORS
app.use(
  cors({
    origin: "http://reserva-front-production.up.railway.app", // Substitua pelo domínio do seu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Se estiver usando cookies ou autenticação
  })
);

// Middleware para parse de JSON no corpo das requisições
app.use(express.json());

// Usar as rotas
app.use("/", routes);

// Rota de teste para verificar CORS
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS configurado com sucesso!" });
});

// Sincronizar os modelos com o banco de dados
db.sequelize
  .sync()
  .then(async () => {
    console.log("Sincronização com o banco de dados bem-sucedida!");

    // Verificação adicional: tentar buscar ou criar um registro
    try {
      const test = await db.Reserva.findOne();
      if (test) {
        console.log("Conexão com o banco de dados verificada com sucesso!");
      } else {
        console.log(
          "Nenhum registro encontrado, mas a conexão está funcionando."
        );
      }
    } catch (error) {
      console.error("Erro ao verificar a conexão com o banco de dados:", error);
    }
  })
  .catch((err) => {
    console.error("Erro ao sincronizar com o banco de dados:", err);
  });

// Definir porta e iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
