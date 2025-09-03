import  { Router } from 'express';
import { exameController } from '../controller/Exame/ExameController.js';
export const examesRouter = Router()

// ROTA PARA BUSCAR POR EXAMES
examesRouter.get("/exames", exameController.getTodosExames)

examesRouter.get("/exames/:id", exameController.getExamesPorId)

// ROTA PARA CADASTRAR NOVOS EXAMES
examesRouter.post("/exames", exameController.criarExames)

// ROTA PARA ATUALIZAR EXAMES PELO ID
examesRouter.put("/exames/:id", exameController.atualizarExames)

// ROTA PARA DELETAR EXAMES PELO ID
examesRouter.delete("/exames/:id", exameController.deletarExames)