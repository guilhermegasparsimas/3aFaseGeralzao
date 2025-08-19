import express from 'express';
import { prismaClient } from '../prisma/prisma.js';

const app = express()
app.use(express.json())

app.get('/usuarios', async (request, response) => {
    try{
        const usuarios = await prismaClient.usuario.findMany();
        return response.json(usuarios)
    }
    catch (e){
            console.log(e)
    }
});

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


app.get('/pacientes', async(request, response) =>{
    try{
        const pacientes = await prismaClient.paciente.findMany();
        return response.json(pacientes)
    }
    catch (e){
            console.log(e)
    }
})

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
app.listen(3000, ()=> console.log("Api rodando"))