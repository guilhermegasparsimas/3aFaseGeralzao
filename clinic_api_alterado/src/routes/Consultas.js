import  { Router } from 'express';
import { consultaController } from '../controller/Consulta/ConsultaController.js';
export const consultasRouter = Router()

// ROTA PARA BUSCAR TODAS CONSULTAS
consultasRouter.get("/consultas", consultaController.getTodasConsultas)

// ROTA PARA BUSCAR CONSULTAS PELO ID
consultasRouter.get("/consultas/:id", consultaController.getConsultasPorId)

// ROTA PARA CADASTRAR NOVAS CONSULTAS
consultasRouter.post("/consultas", consultaController.criarConsultas)

consultasRouter.put("/consultas/:id", consultaController.atualizarConsultas)

// ROTA PARA DELETAR CONSULTAS PELO ID
consultasRouter.delete("/consultas/:id", consultaController.deletarConsultas)
