import express from 'express';
import { usuariosRouter } from './Usuarios/Usuarios.js';
import { prontuariosRouter } from './Prontuarios/Prontuarios.js';
import { pacientesRouter } from './Pacientes/Pacientes.js';
import { examesRouter } from './Exames/Exames.js';
import { consultasRouter } from './Consultas/Consultas.js';

const app = express()
app.use(express.json())
app.use(usuariosRouter)
app.use(prontuariosRouter)
app.use(pacientesRouter)
app.use(examesRouter)
app.use(consultasRouter)

app.listen(3000, () => console.log("Api rodando"))