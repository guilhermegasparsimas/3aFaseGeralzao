import { Router } from 'express';
import { prismaClient } from '../../prisma/prisma.js';
export const pacientesRouter = Router()

// ROTA PARA LISTAR TODOS OS PACIENTES
pacientesRouter.get('/pacientes', async (request, response) => {
    try {
        const pacientes = await prismaClient.paciente.findMany();
        return response.json(pacientes)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA BUSCAR PACIENTES PELO ID
pacientesRouter.get("/pacientes/:id", async (request, response) => {
    try {
        const paciente = await prismaClient.paciente.findUnique({
            where: {
                id: Number(request.params.id),
            },
        })
        if (!paciente) return response.status(404).send('Paciente não encontrado. ID inválido')
        return response.json(paciente)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVOS PACIENTES

pacientesRouter.post("/pacientes", async (req, res) => {
  try {
    const { body } = req
    const bodyKeys = Object.keys(body) // Aqui pegamos todas as chaves do objeto e é gerado um array de strings para a gente, com o formato de ["chave1", "chave2".....]
    console.log(bodyKeys)
    for (const key of bodyKeys) {
      if (key !== "nome" &&
        key !== "cpf" &&
        key !== "telefone" &&
        key !== "email" &&
        key !== "data_nascimento" &&
        key !== "sexo" &&
        key !== "responsavel"
      ) return res.status(404).send("Colunas não existentes")
    }
    const pacientes = await prismaClient.paciente.create({
      data: {
        ...body,
        data_nascimento: new Date(body.data_nascimento),
      },
    })
    return res.status(201).json(pacientes)
  } catch (error) {
    console.error(error)
    if (error.code === "P2002") {
      res.status(404).send("Falha ao cadastrar paciente: Email já cadastrado!")
    }
  }
})

// ROTA PARA DELETAR PACIENTES PELO ID
pacientesRouter.delete("/pacientes/:id", async (req, res) => {
    const { params } = req
    try {
      const pacienteDeletado = await prismaClient.paciente.delete({
        where: {
          id: Number(params.id),
        },
      })
      res.status(200).json({
        message: "Paciente deletado!",
        data: pacienteDeletado
      })
    } catch (error) {
      if (error.code == "P2025") {
        res.status(404).send("Paciente não existe no banco")
      }
      if (error.code == "P2003") {
        res.status(404).send("Paciente não pode ser excluido, pois possui exames vinculados.")
      }
      res.status(500).send(error)
    }
  })

// ROTA PARA ATUALIZAR PACIENTES PELO ID
pacientesRouter.put("/pacientes/:id", async (req, res) => {
    try {
       const { body, params } = req
       const bodyKeys = Object.keys(body)
       for (const key of bodyKeys) {
        if (key !== "nome" &&
            key !== "cpf" &&
            key !== "telefone" &&
            key !== "email" &&
            key !== "data_nascimento" &&
            key !== "sexo" &&
            key !== "responsavel"
        ) return res.status(404).send("Colunas não existentes")
       }
       await prismaClient.paciente.update({
        where: {id: Number(params.id) },
        data: {
            ...body
        },
       })
       const pacienteAtualizado = await prismaClient.paciente.findUnique({
        where: {
            id: Number(params.id)
        }
       })
       return res.status(201).json({
        message: "Paciente atualizado!",
        data: pacienteAtualizado
       })
    } catch (error) {
        console.log(error)
        if (error.code === "P2002") {
            res.status(404).send("Falha ao atualizar paciente, este email já existe!")
        }
        if (error.code === "P2025") {
            res.status(404).send("Paciente não encontrado. ID inválido")
        }
        
    }
})
