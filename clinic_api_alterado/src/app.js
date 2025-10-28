// Path: src/app.js
import express from "express";
import cors from "cors";
import { usuarioRouter } from "./routes/usuarios.js";
import { pacientesRouter } from "./routes/pacientes.js";
import authRouter from "./routes/authRoutes.js";
import { auth } from "./middleware/auth.js";
import { examesRouter } from "./routes/Exames.js";
import { prontuariosRouter } from "./routes/Prontuarios.js";
import { consultasRouter } from "./routes/Consultas.js";

export const app = express();

// Middlewares globais
app.use(cors()); 
app.use(express.json());

app.get("/ping", (req, res) => {
  console.log(" GET /ping chegou");
  res.send("pong");
});

// Rotas
app.use('/auth', authRouter)

app.use(auth);
// rotas privadas
app.use(usuarioRouter);
app.use(examesRouter);
app.use(pacientesRouter);
app.use(prontuariosRouter);
app.use(consultasRouter);

// const port = 4000;
// app.listen(port, () => console.log(`Api rodando na porta ${port}`));