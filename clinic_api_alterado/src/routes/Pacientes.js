import { Router } from 'express';
import { pacienteController } from '../controller/Paciente/PacienteController.js';
export const pacientesRouter = Router()

// ROTA PARA LISTAR TODOS OS PACIENTES
pacientesRouter.get('/pacientes', pacienteController.getTodosPacientes)

// ROTA PARA BUSCAR PACIENTES PELO ID
pacientesRouter.get("/pacientes/:id", pacienteController.getPacientesPorId)

// ROTA PARA CADASTRAR NOVOS PACIENTES
pacientesRouter.post("/pacientes", pacienteController.criarPacientes)

// ROTA PARA DELETAR PACIENTES PELO ID
pacientesRouter.delete("/pacientes/:id", pacienteController.deletarPacientes)

// ROTA PARA ATUALIZAR PACIENTES PELO ID
pacientesRouter.put("/pacientes/:id", pacienteController.atualizarPacientes)
