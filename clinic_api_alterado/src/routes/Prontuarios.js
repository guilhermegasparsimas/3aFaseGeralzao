import { Router } from 'express';
import { prontuarioController } from '../controller/Prontuario/ProntuarioController.js';
export const prontuariosRouter = Router()

// ROTA PARA BUSCAR TODOS PRONTUARIOS
prontuariosRouter.get('/prontuarios', prontuarioController.getTodosProntuarios)

// ROTA PARA BUSCAR PRONTUARIOS PELO ID
prontuariosRouter.get("/prontuarios/:id", prontuarioController.getProntuariosPorId)

// ROTA PARA CADASTRAR NOVOS PRONTUARIOS
prontuariosRouter.post("/prontuarios", prontuarioController.criarProntuarios)

// ROTA PARA ATUALIZAR PRONTUARIOS PELO ID
prontuariosRouter.put("/prontuarios/:id", prontuarioController.atualizarProntuarios)
  
// ROTA PARA DELETAR PRONTUARIOS PELO ID
prontuariosRouter.delete("/prontuarios/:id", prontuarioController.deletarProntuarios)
