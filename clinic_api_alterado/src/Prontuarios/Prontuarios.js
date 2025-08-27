import { Router } from 'express';
import { prismaClient } from '../../prisma/prisma.js';
export const prontuariosRouter = Router()

// ROTA PARA BUSCAR TODOS PRONTUARIOS
prontuariosRouter.get('/prontuarios', async (request, response) => {
    try {
        const prontuarios = await prismaClient.prontuario.findMany();
        return response.json(prontuarios)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA BUSCAR PRONTUARIOS PELO ID
prontuariosRouter.get("/prontuarios/:id", async (request, response) => {
    try {
        const prontuario = await prismaClient.prontuario.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        if (!prontuario) return response.status(404).send('Erro ao encontar prontuario. ID inválido')
        return response.json(prontuario)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVOS PRONTUARIOS
prontuariosRouter.post("/prontuarios", async (req, res) => {
    try {
      const { body } = req
      const bodyKeys = Object.keys(body) // Aqui pegamos todas as chaves do objeto e é gerado um array de strings para a gente, com o formato de ["chave1", "chave2".....]
      console.log(bodyKeys)
      for (const key of bodyKeys) {
        if (key !== "descricao" &&
          key !== "data" &&
          key !== "medico_responsavel_id" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      const prontuarios = await prismaClient.prontuario.create({
        data: {
          ...body,
          data: new Date(body.data),
        },
      })
      return res.status(201).json(prontuarios)
    } catch (error) {
      console.error(error)
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar prontuario!")
      }
    }
  })

// ROTA PARA ATUALIZAR PRONTUARIOS PELO ID
prontuariosRouter.put("/prontuarios/:id", async (req, res) => {
    try {
      const { body, params } = req
      const bodyKeys = Object.keys(body)
      for (const key of bodyKeys) {
        if (key !== "descricao" &&
          key !== "data" &&
          key !== "medico_responsavel_id" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      await prismaClient.prontuario.update({
        where: { id: Number(params.id) },
        data: {
          ...body
        },
      })
      const prontuarioAtualizado = await prismaClient.prontuario.findUnique({
        where: {
          id: Number(params.id)
        }
      })
  
      return res.status(201).json({
        message: "Prontuario atualizado!",
        data: prontuarioAtualizado
      })
  
    } catch (error) {
      if (error.code == "P2025") {
        res.status(404).send("prontuario não existe no banco")
      }
     
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar prontuario!")
      }
    }
  })
  
// ROTA PARA DELETAR PRONTUARIOS PELO ID
prontuariosRouter.delete("/prontuarios/:id", async (req, res) => {
    const { params } = req
    try {
        const prontuarioDeletado = await prismaClient.prontuario.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Prontuario deletado!",
            data: prontuarioDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            res.status(404).send("Prontuario não deletado. ID inválido")
        }
    }
})