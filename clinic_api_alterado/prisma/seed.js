import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

async function main() {


  // await prisma.usuario.createMany({
  //   data: [
  //     { nome:"Alexandre", 
  //       email: "Alexandre@gmail.com", 
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //   ],
  // });

  await prisma.exame.createMany({
    data: [
      {
        data_exame: "Exame Psicológico",
        link_arquivo: "http://Psicologico.com",
        observacoes: "Teste psicologico para automoveis",
        paciente_id: 1,
        resultado: "Muito bom",
        tipo_exame: "Errorrr"
      },
      {
        data_exame: "Exame Psicológico",
        link_arquivo: "http://Psicologico.com",
        observacoes: "Teste psicologico para automoveis",
        paciente_id: 1,
        resultado: "Muito bom",
        tipo_exame: "Errorrr"
      },
      {
        data_exame: "Exame Psicológico",
        link_arquivo: "http://Psicologico.com",
        observacoes: "Teste psicologico para automoveis",
        paciente_id: 1,
        resultado: "Muito bom",
        tipo_exame: "Errorrr"
      },
      {
        data_exame: "Exame Psicológico",
        link_arquivo: "http://Psicologico.com",
        observacoes: "Teste psicologico para automoveis",
        paciente_id: 1,
        resultado: "Muito bom",
        tipo_exame: "Errorrr"
      },
      {
        data_exame: "Exame Psicológico",
        link_arquivo: "http://Psicologico.com",
        observacoes: "Teste psicologico para automoveis",
        paciente_id: 1,
        resultado: "Muito bom",
        tipo_exame: "Errorrr"
      },
      {
        data_exame: "Exame Psicológico",
        link_arquivo: "http://Psicologico.com",
        observacoes: "Teste psicologico para automoveis",
        paciente_id: 1,
        resultado: "Muito bom",
        tipo_exame: "Errorrr"
      },
    ]
  });
  await prisma.prontuario.createMany({
    data: [
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
      {
       data: "2021-12-12T00:00:00Z",
       descricao: "Prontuário",
       medico_responsavel_id: 1,
       paciente_id: 1
      },
    ]
  });

  await prisma.paciente.createMany({
    data: [
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
      {
        cpf: "125.472.519-90",
        data_nascimento: "2021-12-12T00:00:00Z",
        email: "guisimas@gmail.com",
        nome: "guilherme",
        sexo: "masculino",
        telefone: 121434,     
      },
    ]
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

