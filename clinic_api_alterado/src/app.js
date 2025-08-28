import express from 'express';
import { usuarioRouter } from './routes/Usuarios.js';
import { prontuariosRouter } from './routes/Prontuarios.js';
import { pacientesRouter } from './routes/Pacientes.js';
import { examesRouter } from './routes/Exames.js';
import { consultasRouter } from './routes/Consultas.js';

const app = express()
app.use(express.json())
app.use(usuarioRouter)
app.use(prontuariosRouter)
app.use(pacientesRouter)
app.use(examesRouter)
app.use(consultasRouter)

app.listen(3000, () => console.log("Api rodando"))