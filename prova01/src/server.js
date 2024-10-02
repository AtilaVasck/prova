import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

//importar conexão com o banco
import conn from "./config/connectionDB.js";

//importar modulos
import "./models/palestranteModel.js";
import "./models/parcipanteModel.js";
import "./models/eventoModel.js"

//importar as rotas
import participanteRouter from "./routes/participanteRouter.js";
import palestranteRouter from "./routes/palestranteRouter.js";
import eventoRouter from "./routes/eventoRouter.js"

const PORT = process.env.PORT || 3333;
const app = express();

// 3 middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());//permite usar informações no formato json

//utilizar rotas
app.use("/participante", participanteRouter);
app.use("/palestrante", palestranteRouter);
app.use("/eventos", eventoRouter);

app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada." });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
