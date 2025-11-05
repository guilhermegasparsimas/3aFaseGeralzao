// Path: tests/routes/usuarios.test.js

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

describe("Testes de Integração para /usuarios", () => {
  let token;

  beforeEach(async () => {
    await clearDatabase();

    const hashedPassword = await bcrypt.hash("123", 10);

    await prismaClient.usuario.create({
      data: {
        nome: "Usuario de Teste Integrado",
        email: "integrado@teste.com",
        senha: hashedPassword,
        cargo: "medico",
      },
    });

    const userResponse = await request(app)
      .post("/auth/login")
      .send({ email: "integrado@teste.com", senha: "123" })
      .expect(200);

    token = userResponse.body.accessToken;
  });

  afterAll(async () => {
    await clearDatabase();
    await prismaClient.$disconnect();
  });

  test("GET /usuarios - Deve retornar a lista de usuários do banco", async () => {
    const response = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].nome).toBe("Usuario de Teste Integrado");
    expect(response.body[0].email).toBe("integrado@teste.com");
  });

  test("GET /usuarios - Deve retornar um array vazio se não houver usuários", async () => {
    await clearDatabase();

    const response = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("PUT /usuarios/:id", async () => {

    const usuarioExistente = await prismaClient.usuario.findUnique({
      where: { email: "integrado@teste.com" },
    });

    // Garante que o usuário existe para o teste
    expect(usuarioExistente).toBeDefined();
    const userId = usuarioExistente.id;

    // 2. Novos dados a serem atualizados
    const updatedData = {
      nome: "Novo Nome Atualizado",
      email: "novo.email.atualizado@teste.com",
      cargo: "enfermeiro", // Mudança de cargo
      // Não é necessário enviar a senha se não for alterá-la
    };

    // 3. Executar a requisição PUT
    const response = await request(app)
      .put(`/usuarios/${userId}`) // Utiliza o ID real na URL
      .set("Authorization", `Bearer ${token}`) // Envia o Bearer Token
      .send(updatedData) // Envia o corpo da requisição com os dados atualizados
      .expect("Content-Type", /json/);

    // 4. Validar o Status Code
    expect(response.status).toBe(200);

    // 5. Verificar o corpo da resposta (opcional: a API pode retornar o usuário atualizado)
    expect(response.body.nome).toBe(updatedData.nome);
    expect(response.body.email).toBe(updatedData.email);
    expect(response.body.cargo).toBe(updatedData.cargo);
    // Verifica se o campo de senha não foi retornado (segurança)
    expect(response.body.senha).toBeUndefined();

    // 6. Teste de persistência: Busca o recurso diretamente no banco de dados para confirmar
    const usuarioAtualizadoDB = await prismaClient.usuario.findUnique({
      where: { id: userId },
    });

    expect(usuarioAtualizadoDB.nome).toBe(updatedData.nome);
    expect(usuarioAtualizadoDB.email).toBe(updatedData.email);
    expect(usuarioAtualizadoDB.cargo).toBe(updatedData.cargo);
    expect(usuarioAtualizadoDB.senha).toBe(usuarioExistente.senha); 
    // A senha deve ser a mesma (hash)
  });

});
