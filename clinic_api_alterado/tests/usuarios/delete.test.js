import { prismaClient } from "../../prisma/prisma";

test("Delete user", async () => {
    const data = {
        nome: "Jaqueline",
        email: "jaqueline@gmail.com",
        cargo: "Desenvolvedor",
        senha: "jaque123"
    }
    const usuarios =  await prismaClient.usuario.delete({
        data: data,
    });
    expect(usuarios);
})