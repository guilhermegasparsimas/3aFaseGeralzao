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
  let userId;

  beforeEach(async () => {
    await clearDatabase();

    const hashedPassword = await bcrypt.hash("123", 10);

    const userCreated = await prismaClient.usuario.create({
      data: {
        nome: "Usuario de Teste Integrado",
        email: "integrado@teste.com",
        senha: hashedPassword,
        cargo: "medico",
      },
    });

    userId = userCreated.id;

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

  test("POST /usuarios - Deve retornar 201 usuario Criado com sucesso" , async () => {
    await clearDatabase();

    const novoUsuario = {
      nome: "Gustavo Almeida",
      email: "gustavoalmeida@email.com",
      senha: "gustavo123",
      cargo: "Médico Senai"
    };

    const response = await request(app)
    .post("/usuarios")
    .set("Authorization", `Bearer ${token}`)

    .send(novoUsuario)
    .expect("Content-type", /json/)
    .expect(201)
    .expect(response.body).toHaveProperty("id")
    .expect(response.body.nome).toBe(novoUsuario.nome)
    .expect(response.body.email).toBe(novoUsuario.email)
    .expect(response.body.cargo).toBe(novoUsuario.cargo)
    .expect(response.body).not.toHaveProperty("senha")

    // Verifica se foi criado no Banco de Dados 
    const usuarioCriado = await prismaClient.usuario.findUnique({
      where : {email: novoUsuario.email}
    })

    // usuario criado é diferente de null
    .expect(usuarioCriado).not.toBeNull()
    // nome de usuario criado é igual nome de novoUsuario
    .expect(usuarioCriado.nome).toBe(novoUsuario.nome)
    // garante que a senha que foi salva no banco de dados é diferente da senha em texto puro que o usuario digitou, "Verifica se o hash de senha foi feito com sucesso"
    .expect(usuarioCriado.senha).not.toBe(novoUsuario.senha)
  })

  test("POST /usuarios - Deve retornar 401 se não houver token de autenticação", async () => {
    const novoUsuario = {
      nome: "Sem Token",
      email: "sem.token@teste.com",
      senha: "senha123",
      cargo: "secretario",
    };


    const response = await request(app)
      .post("/usuarios")
      .send(novoUsuario)
      .expect(401); 

    expect(response.body).toHaveProperty("message");
  });

  test("PUT /usuarios - Deve retornar 200 usuario Atualizado com sucesso", async () => {
    const dadosAtualizados = {
      nome: "Nome Atualizado",
      cargo: "Professor Teste de Sistemas"
    }
    const response = await request(app)
      .put(`/usuarios/${userId}`) // pega o id do usuario
      .set("Authorization", `Bearer ${token}`) // Autoriza o token

      .send(dadosAtualizados) // devolve os dados autalizados como resposta ao usuário
      .expect("Content-Type", /json/) // 
      .expect(200);


    expect(response.body.id).toBe(userId); // garante quo id retornado pela API corresponde ao id do usuario esperado
    expect(response.body.nome).toBe(dadosAtualizados.nome); // garante que o nome retornado pela API corresponda ao nome que deve ser atualizado
    expect(response.body.cargo).toBe(dadosAtualizados.cargo); // garate que o "cargo" retornado pela API corresponda ao "cargo" que deve ser atualizado

    expect(response.body.email).toBe("integrado@teste.com"); // verifica se o e-mail retornado no corpo da resposta da API é exatamente igual a um valor específico esperado.
    
    // usuarioAtualizadoDB recebe o ID do Bancon de Dados
    const usuarioAtualizadoDB = await prismaClient.usuario.findUnique({
      where: { id: userId },
    });

    // espera que o usuario seja atualizado "Diferente de null"
    expect(usuarioAtualizadoDB).not.toBeNull();
    // espera que o nome do banco de dados seja igual ao nome atualizado
    expect(usuarioAtualizadoDB.nome).toBe(dadosAtualizados.nome);
    //espera que o cargo no banco de dados seja igual ao cargo atualizado
    expect(usuarioAtualizadoDB.cargo).toBe(dadosAtualizados.cargo);

  });

  test("PUT /usuarios/:id - Deve retornar 404 se o usuário não for encontrado", async () => {
    const dadosAtualizados = { nome: "Inexistente" };
    const ID_INEXISTENTE = '99999999-9999-9999-9999-999999999999'; // usar id inexistente
    
    const response = await request(app)
      .put(`/usuarios/${ID_INEXISTENTE}`)
      .set("Authorization", `Bearer ${token}`)
      .send(dadosAtualizados)
      .expect(404); 
      
    expect(response.body).toHaveProperty("message");
  });

  test("PUT /usuarios/:id - Deve retornar 401 se não houver token de autenticação", async () => {
    const dadosAtualizados = { nome: "Sem Token" };
    
    const response = await request(app)
      .put(`/usuarios/${userId}`)
      // Requisição POST SEM o header "Authorization"

      .send(dadosAtualizados)
      .expect(401); 
  });

  test("PATCH /usuarios/:id - Deve retornar 200 e atualizar apenas um campo do usuário", async () => {
    // Defina os dados que voce quer atualizar aqui
    const dadosParciais = {
      email: "novo.email.patch@teste.com",
    };

    const response = await request(app)
      .patch(`/usuarios/${userId}`) // Utiliza o método PATCH e o ID do usuário criado no beforeEach
      .set("Authorization", `Bearer ${token}`) // Autoriza o token
      .send(dadosParciais)
      .expect("Content-Type", /json/)
      .expect(200);

    // Asserções na Resposta da API
    expect(response.body.id).toBe(userId);
    // Verifica se o campo atualizado (email) corresponde ao valor enviado
    expect(response.body.email).toBe(dadosParciais.email);
    // Verifica se o campo não-enviado (nome) manteve o valor original do beforeEach
    expect(response.body.nome).toBe("Usuario de Teste Integrado");
    // Verifica se o campo cargo manteve o valor original
    expect(response.body.cargo).toBe("medico");
    
    // Verificação no Banco de Dados
    const usuarioAtualizadoDB = await prismaClient.usuario.findUnique({
      where: { id: userId },
    });

    // Espera que o usuário exista
    expect(usuarioAtualizadoDB).not.toBeNull();
    // Espera que o email no banco de dados seja o novo email
    expect(usuarioAtualizadoDB.email).toBe(dadosParciais.email);
    // Espera que o nome e cargo no banco de dados não tenha sido alterado
    expect(usuarioAtualizadoDB.nome).toBe("Usuario de Teste Integrado");
    expect(usuarioAtualizadoDB.cargo).toBe("medico");
  });

  test("PATCH /usuarios/:id - Deve retornar 404 se o usuário não for encontrado", async () => {
    const dadosParciais = { nome: "Inexistente" };
    const ID_INEXISTENTE = '99999999-9999-9999-9999-999999999999'; 

    const response = await request(app)
      .patch(`/usuarios/${ID_INEXISTENTE}`)
      .set("Authorization", `Bearer ${token}`)
      .send(dadosParciais)
      .expect(404); 
      
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /usuarios/:id - Deve retornar 401 se não houver token de autenticação", async () => {
    const dadosParciais = { nome: "Sem Token" };
    
    const response = await request(app)
      .patch(`/usuarios/${userId}`)

      .send(dadosParciais)
      .expect(401); 
  });

  test("DELETE /usuarios/:id - Deve excluir o usuário com sucesso e retornar 204", async () => {
    // Requisição DELETE para a rota com o ID do usuário
    const response = await request(app)
      .delete(`/usuarios/${userId}`) // id do beforeEach
      .set("Authorization", `Bearer ${token}`)
      .expect(204); // 204 é um padrão de resposta para exclusçao bem sucessida
    
    // Para 204, o corpo da resposta deve ser vazio ou não existir (supertest deve retornar {})
    expect(response.status).toBe(204);
    expect(response.body).toEqual({}); 

    // Confirmar exclusão no banco de dados
    const usuarioExcluido = await prismaClient.usuario.findUnique({
      where: { id: userId },
    });

    // O usuário não deve mais ser encontrado no banco de dados
    expect(usuarioExcluido).toBeNull();
  });
  
  test("DELETE /usuarios/:id - Deve retornar 404 se tentar excluir um usuário que não existe", async () => {
    // Definir um ID que  não existe no bando de ddos
    const ID_INEXISTENTE = '00000000-0000-0000-0000-000000000000';
    
    // simular a exclusão com id inválido
    const response = await request(app)
      .delete(`/usuarios/${ID_INEXISTENTE}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404); 
      
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /usuarios/:id - Deve retornar 401 se não houver token de autenticação", async () => {
    const response = await request(app)
      .delete(`/usuarios/${userId}`)
      .expect(401); 
      
    expect(response.body).toHaveProperty("message");
  });
});
