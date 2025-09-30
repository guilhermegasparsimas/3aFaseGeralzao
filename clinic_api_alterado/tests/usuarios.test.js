// import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../prisma/prisma.js";
// const prisma = new PrismaClient();

// import { usuarioController } from "../src/controller/Usuario/UsuarioController";

// const baseUrl = "http://localhost:3000";

test("Consulta ao banco retorna lista de usuarios", async () => {
    const usuarios =  await prismaClient.usuario.findMany();
    expect(Array.isArray(usuarios)).toBe(true);
});

test("Consulta ao banco retorna usuario por ID", async () => {
    const usuarios = await prisma.usuario.findUnique({
        where: {
            email: prismaClient.usuario.email
        }
    })
    expect(usuarios);
});

// const userTest = prismaClient.usuario.create({
//     data: {
//         nome: "Edio Mello",
//         email: "Edio_mello@pereira.com",
//         cargo: "Professor do Senai",
//         senha: "senai"
//     }
// })

// await prismaClient.usuario.delete({
//     where: {
//         id: userTest.id
//     }
// });

// test("POST /usuarios", async () => {
//     const novoUsuario = { nome: "William", email: "William@example.com", senha: "William", cargo: "Desenvolvedor" };
//     const res = await fetch(`${baseUrl}/usuarios`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(novoUsuario),
//     });
//     const data = await res.json();
//     // expect(data.nome).toBe("Maycon Gibson");

//     await fetch(`${baseUrl}/users/${data.id}`, { method: "DELETE" });
//     const resEmail = await fetch(`${baseUrl}/usuarios/byemail/William@example.com`)
//     expect(resEmail.status).toBe(404)
//     // const resDelete = await fetch(`${baseUrl}/users/${data.id}`);

// });

// test("Get /usuarios", async () => {
//     const res = await fetch(`${baseUrl}/usuarios`);
//     expect(res.status).toBe(200);
// })




// test("GET /usuarios ", async () => {
//     const res = await fetch(`${baseUrl}/usuarios`);
//     const data = await res.json();
//     expect(Array.isArray(data)).toBe(true);
// });

// // -----------------------------
// // Exercício 3: POST cria usuário
// // -----------------------------
// test("POST /usuarios", async () => {
//     const novoUsuario = { nome: "William", email: "William@example.com", senha: "William", cargo: "Desenvolvedor" };
//     const res = await fetch(`${baseUrl}/usuarios`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(novoUsuario),
//     });
//     const data = await res.json();
//     // expect(data.nome).toBe("Maycon Gibson");

//     await fetch(`${baseUrl}/users/${data.id}`, { method: "DELETE" });
//     const resEmail = await fetch(`${baseUrl}/usuarios/byemail/William@example.com`)
//     expect(resEmail.status).toBe(404)
//     // const resDelete = await fetch(`${baseUrl}/users/${data.id}`);

// });


// // -----------------------------
// // Exercício 4: GET usuário específico
// // -----------------------------
// test("GET /usuarios/:3 retorna usuário válido", async () => {
//     const res = await fetch(`${baseUrl}/usuarios/3`);
//     const data = await res.json();
//     expect(data).toHaveProperty("id", 3);
// });

// // -----------------------------
// // Exercício 5: PUT atualiza usuário
// // -----------------------------
// test("PUT /usuarios/:id atualiza nome do usuário", async () => {
//     const res = await fetch(`${baseUrl}/usuarios/3`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             id: 3,
//             nome: "Thiago Atualizado"
//         }),
//     });
//     const data = await res.json();
//     expect(data.data.nome).toBe("Thiago Atualizado");
// });


// // -----------------------------
// // Exercício 7: DELETE usuário
// // -----------------------------
// test("DELETE /users/1 exclui usuário", async () => {
//     await fetch(`${baseUrl}/usuarios/1`, { method: "DELETE" });
//     const res = await fetch(`${baseUrl}/usuarios/1`);
//     expect(res.status).toBe(404);
// });

// // -----------------------------
// // Exercício 8: Validação de usuário inexistente
// // -----------------------------
// test("GET /usuarios/999 retorna 404", async () => {
//     const res = await fetch(`${baseUrl}/usuarios/999`);
//     expect(res.status).toBe(404);
// });

// // -----------------------------
// // Exercício 9: Lista não vazia
// // -----------------------------
// // test("POST cria usuário e lista não está vazia", async () => {
// //     const novoUsuario = { nome: "Carlos", email: "carlos@example.com", cargo: "medico", senha: "123carlos" };
// //     await fetch(`${baseUrl}/usuarios`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(novoUsuario),
// //     });
// //     const res = await fetch(`${baseUrl}/usuarios`);
// //     const data = await res.json();
// //     expect(data.length).toBeGreaterThan(0);

// // });


// // -----------------------------
// // Exercício 10: Encadeamento completo
// // -----------------------------
// test("Fluxo completo de usuário", async () => {
//     // cria
//     let res = await fetch(`${baseUrl}/users`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             name: "Teste Fluxo",
//             email: "fluxo@example.com",
//         }),
//     });
//     let user = await res.json();

//     // pega
//     res = await fetch(`${baseUrl}/users/${user.id}`);
//     let data = await res.json();
//     expect(data).toHaveProperty("nome", "Teste Fluxo");

//     // deleta
//     await fetch(`${baseUrl}/usuarios/${user.id}`, { method: "DELETE" });
//     res = await fetch(`${baseUrl}/usuarios/${user.id}`);
//     expect(res.status).toBe(404);
// });