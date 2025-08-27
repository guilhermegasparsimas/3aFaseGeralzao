import { Router } from 'express';
import { prismaClient } from '../../prisma/prisma.js';
export const usuariosRouter = Router()

// ROTA PARA LISTAR TODOS OS USUARIOS
usuariosRouter.get('/usuarios', async (request, response) => {
    try {
        const usuarios = await prismaClient.usuario.findMany();
        return response.json(usuarios)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA BUSCAR USUARIOS PELO ID
usuariosRouter.get("/usuarios/:id", async (request, response) => {
    try {
        const usuario = await prismaClient.usuario.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        if (!usuario) return response.status(404).send('Error 404, Not Found')
        return response.json(usuario)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR UM NOVO USUÀRIO
usuariosRouter.post("/usuarios", async (req, res) => {
    try {
        const { body } = req
        const usuario = await prismaClient.usuario.create({
            data: {
                nome: body.nome,
                cargo: body.cargo,
                email: body.email,
                senha: body.senha
            },
        })
        return res.status(201).json(usuario)
    } catch (error) {
        console.log(error)
        if (error.code === "P2002") {
            res.status(404).send("Falha ao cadastrar usuário, email já cadastrado")
        }
    }
})

// ROTA PARA ATUALIZAR USUÀRIOS PELO ID
usuariosRouter.put("/usuarios/:id", async (req, res) => {
    try {
        const { body, params } = req
        // const {nome, ...body} = body   
        await prismaClient.usuario.update({
            where: { id: Number(params.id) },
            data: {
                ...body
            },
        })
        const usuarioAtualizado = await prismaClient.usuario.findUnique({
            where: { id: Number(params.id) }

        })
        res.status(201).json({
            message: "Usuario Atualizad!",
            data: usuarioAtualizado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2002") {
            res.status(404).send("Falha ao atualizar usuário, este email já existe!")
        }
        if (error.code === "P2025") {
            res.status(404).send("Usuário não encontrado. ID inválido")
        }

    }
})

// ROTA PARA DELETAR USUARIO PELO ID
usuariosRouter.delete("/usuarios/:id", async (req, res) => {
    const { params } = req
    try {
        const usuarioDeletado = await prismaClient.usuario.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Usuário deletado!",
            data: usuarioDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            res.status(404).send("Usuário não deletado. ID inválido")
        }
    }
})

