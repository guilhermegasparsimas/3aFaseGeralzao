import express, { Router } from 'express';
import { prismaClient } from '../../prisma/prisma.js';
export const examesRouter = Router()

// ROTA PARA BUSCAR POR EXAMES
examesRouter.get("/exames", async (req, res) => {
    try {
        const exames = await prismaClient.exame.findMany();
        return res.json(exames)
    } catch (e) {
        console.log(e)
    }
})

examesRouter.get("/exames/:id", async (req, res)=>{
    try {
        const exame = await prismaClient.exame.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })
        if (!exame) return res.status(404).send('Exame não encontrado. ID inválido')
            return res.json(exame)
    } catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVOS EXAMES
examesRouter.post("/exames", async (req, res) => {
    try {
      const { body } = req
      const bodyKeys = Object.keys(body) // Aqui pegamos todas as chaves do objeto e é gerado um array de strings para a gente, com o formato de ["chave1", "chave2".....]
      console.log(bodyKeys)
      for (const key of bodyKeys) {
        if (key !== "tipo_exame" &&
          key !== "resultado" &&
          key !== "data_exame" &&
          key !== "link_arquivo" &&
          key !== "observacoes" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      const exames = await prismaClient.exame.create({
        data: {
          ...body,
          data_exame: new Date(body.data_exame),
        },
      })
      return res.status(201).json(exames)
    } catch (error) {
      console.error(error)
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar exame!")
      }
    }
  })

// ROTA PARA ATUALIZAR EXAMES PELO ID
examesRouter.put("/exames/:id", async (req, res) => {
    try {
      const { body, params } = req
      const bodyKeys = Object.keys(body)
      for (const key of bodyKeys) {
        if (key !== "tipo_exame" &&
          key !== "resultado" &&
          key !== "data_exame" &&
          key !== "link_arquivo" &&
          key !== "observacoes" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      await prismaClient.exame.update({
        where: { id: Number(params.id) },
        data: {
          ...body
        },
      })
      const exameAtualizado = await prismaClient.exame.findUnique({
        where: {
          id: Number(params.id)
        }
      })
  
      return res.status(201).json({
        message: "Paciente atualizado!",
        data: exameAtualizado
      })
  
    } catch (error) {
      if (error.code == "P2025") {
        res.status(404).send("Usuário não existe no banco")
      }
     
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar usuário: Email já cadastrado!")
      }
    }
  })

// ROTA PARA DELETAR EXAMES PELO ID
examesRouter.delete("/exames/:id", async (req, res) => {
    const { params } = req
    try {
        const exameDeletado = await prismaClient.exame.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Exame deletado!",
            data: exameDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            res.status(404).send("Exame não deletado. ID inválido")
        }
    }
})