import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  // await prisma.usuario.createMany({
  //   data: [
  //     { nome:"Joao", 
  //       email: "joao34@email.com", 
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //   ],
  // });

  await prisma.exame.createMany({
    data: [{
      
    }]
  })

}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });




