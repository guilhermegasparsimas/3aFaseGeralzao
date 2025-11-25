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

describe ("Testes de Integração para a rota /usuarios", () => {
    let token;
    let userId;

    beforeEach(async () => {
        await clearDatabase();

        const hashedPassword = await bcrypt.hash("12345678", 10);

        const userCreated = await prismaClient.usuario.create({
            data: {
                nome: "Usuario De Teste Guilherme",
                email: "guilherme@teste.com",
                senha: hashedPassword,
                cargo: "Desenvolvedor Full Stack",
            };
        });

        userId = userCreated.id;

        const userResponse = await request(app)
        .post("/auth/login")
        .send({email: "guilherme@teste.com", senha : "12345678"})
        .expect(200);

        token = userResponse.body.acesstoken;
    });

    afterAll(async () => {
        await clearDatabase();
        await prismaClient.$disconnect();
    });

    test("Get /usuarios - Deve retornar a lista de usuários do banco", async () => {
        const response = await request(app)
        .get("/usuarios")
        .set("Authorizathion", `Bearer ${token}`)
        .expect("Content-Type", /json/)

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body.nome).toBe("Usuario De Teste Guilherme");
        expect(response.body.email).toBe("guilherme@teste.com");
    });

    test("Get /usuarios - Deve um array vazio se não houver usuários", async () => {
        const response = await request(app)

        .get("/usuarios");
        .set("Authorizathion", `Bearer ${token}`);
        .expect("Content-Type", /json/);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body[0].nome).toBe("Usuario De Teste Guilherme");
        expect(response.body[0].email).toBe("guilherme@teste.com");
    });

    test("Post /usuarios", async () => {

        // Cria novoUsuario
        const novoUsuario = {
            nome: "Gustavo Almeida",
            email: "gustavo@teste.com",
            senha: "gustavoalmeida",
            cargo: "Desenvolvedor Full Stack"
        };

        const response = await request(app) // Response recebe (app) com acesso a todas as rotas da API
        .post("/usuarios") 
        .set("Authorizathion", `Bearer ${token}`) // Autoriza a rota com um token Válido
        .send(novoUsuario)

        .expect("Content-Type", /json/)
        .expect(201)
        .expect(response.body).toHaveProperty("id")
        .expect(response.body.nome).toBe(novoUsuario.nome)
        .expect(response.body.email).toBe(novoUsuario.email)
        .expect(response.body.cargo).toBe(novoUsuario.cargo)
        .expect(response.body.senha).not.toHaveProperty("senha")

        const usuarioCriado = await prismaClient

    });


})