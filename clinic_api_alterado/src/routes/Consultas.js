import  { Router } from 'express';
import { prismaClient } from '../../prisma/prisma.js';
export const consultasRouter = Router()

// ROTA PARA BUSCAR TODAS CONSULTAS
consultasRouter.get("/consultas", async (req, res) => {
    try {
        const consultas = await prismaClient.consulta.findMany();
        return res.json(consultas)
    } catch (e) {
        console.log(e)
    }
})

// ROTA PARA BUSCAR CONSULTAS PELO ID
consultasRouter.get("/consultas/:id", async (request, response) => {
    try {
        const consulta = await prismaClient.consulta.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        if (!consulta) return response.status(404).send('Erro ao encontar consulta. ID inválido')
        return response.json(consulta)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVAS CONSULTAS
consultasRouter.post("/consultas", async (req, res) => {
    try {
      const { body } = req
      const bodyKeys = Object.keys(body) // Aqui pegamos todas as chaves do objeto e é gerado um array de strings para a gente, com o formato de ["chave1", "chave2".....]
      console.log(bodyKeys)
      for (const key of bodyKeys) {
        if (key !== "motivo" &&
          key !== "data_consulta" &&
          key !== "observacoes" &&
          key !== "medico_responsavel_id" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      const consultas = await prismaClient.consulta.create({
        data: {
          ...body,
          data_consulta: new Date(body.data_consulta),
        },
      })
      return res.status(201).json(consultas)
    } catch (error) {
      console.error(error)
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar consulta!")
      }
    }
  })

consultasRouter.put("/consultas/:id", async (req, res) => {
    try {
      const { body, params } = req
      const bodyKeys = Object.keys(body)
      for (const key of bodyKeys) {
        if (key !== "motivo" &&
          key !== "data_consulta" &&
          key !== "observacoes" &&
          key !== "medico_responsavel_id" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      await prismaClient.consulta.update({
        where: { id: Number(params.id) },
        data: {
          ...body
        },
      })
      const consultaAtualizado = await prismaClient.consulta.findUnique({
        where: {
          id: Number(params.id)
        }
      })
  
      return res.status(201).json({
        message: "Consulta atualizada!",
        data: consultaAtualizado
      })
  
    } catch (error) {
      if (error.code == "P2025") {
        res.status(404).send("consulta não existe no banco")
      }
     
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar consulta!")
      }
    }
  })

// ROTA PARA DELETAR CONSULTAS PELO ID
consultasRouter.delete("/consultas/:id", async (req, res) => {
    const { params } = req
    try {
        const consultaDeletado = await prismaClient.consulta.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Consulta deletada!",
            data: consultaDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            res.status(404).send("Consulta não deletada. ID inválido")
        }
    }
})
