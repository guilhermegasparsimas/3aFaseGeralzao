import bcrypt from "bcrypt";
import request from "supertest";
import { app } from "../../src/app";
import { prismaClient } from "../../prisma/prisma";

async function clearDatabase() {
  await prismaClient.prontuario.deleteMany({});
  await prismaClient.consulta.deleteMany({});
  await prismaClient.exame.deleteMany({});
  await prismaClient.paciente.deleteMany({});
  await prismaClient.token.deleteMany({});
  await prismaClient.usuario.deleteMany({});
}

describe("Testes de integração para /prontuarios", async () => {
    let token;

     beforeEach(async () => {
        await clearDatabase();
    
        const hashedPassword = await bcrypt.hash("123", 10);
    
         await prismaClient.prontuario.create({
          data: {
            descricao: "Teste de prontuarios",
            data: "2025-12-12T00:00:00Z",
            medico_responsavel_id: 1,
            paciente_id: 1,
          },
        });
        
        const prontuarioResponse = await request(app)
          .post("/auth/login")
          .send({ email: "integrado@teste.com", senha: "123" })
          .expect(200);
    
        token = prontuarioResponse.body.accessToken;
      });
    
      afterAll(async () => {
        await clearDatabase();
        await prismaClient.$disconnect();
      });
})