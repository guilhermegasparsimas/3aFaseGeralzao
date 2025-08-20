import express from 'express';
import { prismaClient } from '../prisma/prisma.js';

const app = express()
app.use(express.json())

// ROTA PARA BUSCAR USUARIOS PELO ID
app.get("/usuarios/:id", async(request, response)=>{
    try{
        const usuario = await prismaClient.usuario.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        if(!usuario) return response.status(404).send('Error 404, Not Found')
            return response.json(usuario)
    }  
    catch (e){
        console.log(e)
    }
})

// ROTA PARA CADASTRAR UM NOVO USUÀRIO
app.post("/usuarios", async(req, res)=>{
    try{
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
    } catch (error){
        console.log(error)
        if(error.code === "P2002"){
            res.status(404).send("Falha ao cadastrar usuário, email já cadastrado")
        }
    }
})

// ROTA PARA ATUALIZAR USUÀRIOS PELO ID
app.put("/usuarios/:id", async(req, res)=>{
    try{
    const { body, params } = req
    // const {nome, ...body} = body   
    await prismaClient.usuario.update({
        where: {id: Number(params.id)},
        data: {
            ...body
        },
    })
        const usuarioAtualizado = await prismaClient.usuario.findUnique({
            where: {id: Number(params.id)}
   
        })
    res.status(201).json({
        message: "Usuario Atualizad!",
        data: usuarioAtualizado
    })
    } catch (error) {
        console.log(error)
        if(error.code === "P2002"){
            res.status(404).send("Falha ao atualizar usuário, este email já existe!")
        }
        if(error.code === "P2025"){
            res.status(404).send("Usuário não encontrado. ID inválido")
        }
        
    }  
})

// ROTA PARA LISTAR TODOS OS PACIENTES
app.get('/pacientes', async(request, response) =>{
    try{
        const pacientes = await prismaClient.paciente.findMany();
        return response.json(pacientes)
    }
    catch (e){
            console.log(e)
    }
})

// ROTA PARA BUSCAR PACIENTES PELO ID
app.get("/pacientes/:id", async(request, response) =>{
    try{
        const paciente = await prismaClient.paciente.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        return response.json(paciente)
    }
    catch (e){
            console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVOS PACIENTES
app.post("/pacientes", async(req, res)=>{
    try{
    const { body } = req
    const paciente = await prismaClient.paciente.create({
        data: {
            nome: body.nome,
            cpf: body.cpf,
            telefone: body.telefone,
            email: body.email,
            data_nascimento: new Date(),
            sexo: body.sexo,
            responsavel: body.responsavel
        },
    })
    return res.status(201).json(paciente)
    } catch (error){
        console.log(error)
        if(error.code === "P2002"){
            res.status(404).send("Falha ao cadastrar usuário, email já cadastrado")
        }
    }
})

app.listen(3000, ()=> console.log("Api rodando"))