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

app.get('/pacientes', async(request, response) =>{
    try{
        const pacientes = await prismaClient.paciente.findMany();
        return response.json(pacientes)
    }
    catch (e){
            console.log(e)
    }
})

app.get("/usuarios/:id", async(request, response)=>{
    try{
        const usuario = await prismaClient.usuario.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        if(usuario == null){
            return response.status(404).json('Error 404, Not Found teste');
        }
        return response.json(usuario)
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