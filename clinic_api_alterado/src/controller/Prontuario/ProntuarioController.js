import { prismaClient } from "../../../prisma/prisma.js";

class ProntuarioController{
    constructor(){}
    async getTodosProntuarios(req, res){
      const { page, limit} = req.query
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
        try {
            const prontuarios = await prismaClient.prontuario.findMany(
              {
                skip: (pageNumber -1) * limitNumber,
                take: limitNumber,
              },
            );
            return res.json(prontuarios)
        }
        catch (e) {
            console.log(e)
        }
    }

    async getProntuariosPorId(req, res){
        try {
            const prontuario = await prismaClient.prontuario.findUnique({
                where: {
                    id: Number(req.params.id),
                }
            })
            if (!prontuario) return res.status(404).send('Erro ao encontar prontuario. ID inválido')
            return res.json(prontuario)
        }
        catch (e) {
            console.log(e)
        }
    }

    async criarProntuarios(req, res){
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
    }

    async atualizarProntuarios(req, res){
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
    }

    async deletarProntuarios(req, res){
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
    }
    
}

export const prontuarioController = new ProntuarioController();