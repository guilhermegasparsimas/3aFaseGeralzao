// Path: tests/routes/usuarios.test.js

import request from 'supertest';
import { app } from '../../src/app';
import { prismaClient } from '../../prisma/prisma';

describe('Testes de Integração para /usuarios', () => {

    // limpar o banco na ordem correta
    beforeEach(async () => {
        // limpar as que dependem do usuário

        await prismaClient.prontuario.deleteMany({});
        await prismaClient.consulta.deleteMany({});
        await prismaClient.exame.deleteMany({});
        await prismaClient.paciente.deleteMany({});

        // 3. "pai"
        await prismaClient.usuario.deleteMany({});

        // seed pra test
        await prismaClient.usuario.create({
            data: {
                nome: 'Usuario de Teste Integrado',
                email: 'integrado@teste.com',
                senha: '123',
                cargo: 'medico',
            },
        });
    });

    // limpar tudo dps dos testes na mesma ordem
    afterAll(async () => {

        await prismaClient.prontuario.deleteMany({});
        await prismaClient.consulta.deleteMany({});
        await prismaClient.exame.deleteMany({});

        // 2. "intermediárias"
        await prismaClient.paciente.deleteMany({});

        // 3. "pai"
        await prismaClient.usuario.deleteMany({});

        await prismaClient.$disconnect();
    });


    test('GET /usuarios - Deve retornar a lista de usuários do banco', async () => {
        // O supertest req dados da app
        const response = await request(app).get('/usuarios');


        // deu boa?
        expect(response.status).toBe(200);

        // O corpo da resposta é um array?
        expect(Array.isArray(response.body)).toBe(true);

        // O array contém o usuário que criamos?
        expect(response.body.length).toBe(1);
        expect(response.body[0].nome).toBe('Usuario de Teste Integrado');
        expect(response.body[0].email).toBe('integrado@teste.com');
    });

    test('GET /usuarios - Deve retornar um array vazio se não houver usuários', async () => {

        await prismaClient.prontuario.deleteMany({});
        await prismaClient.consulta.deleteMany({});
        await prismaClient.exame.deleteMany({});

        // 2. intermediárias
        await prismaClient.paciente.deleteMany({});

        // 3. "pai"
        await prismaClient.usuario.deleteMany({});

        // acao
        const response = await request(app).get('/usuarios');

        // verificar assert
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
        expect(response.body).toEqual([]);
    });

    test('POST /usuarios - Deve criar um novo usuário e retornar 201', async () => {
        const response = await request(app)
            .post('/usuarios')
            .send(newUserPayload);

        // Verifica a resposta
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.email).toBe(newUserPayload.email);

        // Verifica o banco de dados
        const createdUser = await prismaClient.usuario.findUnique({
            where: { email: newUserPayload.email }
        });

        expect(createdUser).not.toBeNull();
        expect(createdUser.nome).toBe(newUserPayload.nome);
        // Não deve retornar a senha no corpo (se o controller estiver filtrando)
        expect(response.body).not.toHaveProperty('senha');
    });
});

