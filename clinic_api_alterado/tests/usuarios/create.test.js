import { prismaClient } from "../../prisma/prisma";

test("Create a user with prisma", async () => {
    const data = {
        nome: "Jaqueline",
        email: "jaqueline@gmail.com",
        cargo: "Desenvolvedor",
        senha: "jaque123"
    }
    const usuarios =  await prismaClient.usuario.create({
        data: data,
    });
    expect(usuarios).toMatchObject(usuarios);
});