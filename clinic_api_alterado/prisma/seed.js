import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  await prisma.usuario.createMany({
    data: [
      { nome:"Alexandre", 
        email: "Alexandre@gmail.com", 
        senha: "123",
        cargo: "Médico"
      },
    ],
  });

  await prisma.paciente.create({
    data: {
      nome: "Alexandre de Cássio",
      sexo: "Masculino",
      data_nascimento: new Date("1980-12-11"),
      cpf: "432.123.333-12",
      telefone: 952556232,
      email: "AlexandreCássio@email.com",
      responsavel: "",
      // Consulta: {
      //   create: [
      //     {
      //       motivo: "Dor nas costas",
      //       data_consulta: new Date("2023-08-25"),
      //       observacoes: "Ibuprofeno 3 vezes ao dia",
      //       medico_responsavel_id: 
      //     }
      //   ]
      // },
      // Exame: {
      //   create: [
      //     {
      //       tipo: "Densiometro",
      //       data_exame: new Date("2023-08-25"),
      //       resultado: "deu ruim",
      //       link_arquivo: "url.com.br/exame.pdf",
      //       observacoes: ""
      //     }
      //   ]
      // }
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

