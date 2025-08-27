import express from 'express';
import { prismaClient } from '../prisma/prisma.js';

const app = express()
app.use(express.json())

// ROTA PARA LISTAR TODOS OS USUARIOS
app.get('/usuarios', async (request, response) => {
    try {
        const usuarios = await prismaClient.usuario.findMany();
        return response.json(usuarios)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA BUSCAR USUARIOS PELO ID
app.get("/usuarios/:id", async (request, response) => {
    try {
        const usuario = await prismaClient.usuario.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        if (!usuario) return response.status(404).send('Error 404, Not Found')
        return response.json(usuario)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR UM NOVO USUÀRIO
app.post("/usuarios", async (req, res) => {
    try {
        const { body } = req
        const usuario = await prismaClient.usuario.create({
            data: {
                nome: body.nome,
                cargo: body.cargo,
                email: body.email,
                senha: body.senha
            },
        })
        return res.status(201).json(usuario)
    } catch (error) {
        console.log(error)
        if (error.code === "P2002") {
            res.status(404).send("Falha ao cadastrar usuário, email já cadastrado")
        }
    }
})

// ROTA PARA ATUALIZAR USUÀRIOS PELO ID
app.put("/usuarios/:id", async (req, res) => {
    try {
        const { body, params } = req
        // const {nome, ...body} = body   
        await prismaClient.usuario.update({
            where: { id: Number(params.id) },
            data: {
                ...body
            },
        })
        const usuarioAtualizado = await prismaClient.usuario.findUnique({
            where: { id: Number(params.id) }

        })
        res.status(201).json({
            message: "Usuario Atualizad!",
            data: usuarioAtualizado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2002") {
            res.status(404).send("Falha ao atualizar usuário, este email já existe!")
        }
        if (error.code === "P2025") {
            res.status(404).send("Usuário não encontrado. ID inválido")
        }

    }
})

// ROTA PARA DELETAR USUARIO PELO ID
app.delete("/usuarios/:id", async (req, res) => {
    const { params } = req
    try {
        const usuarioDeletado = await prismaClient.usuario.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Usuário deletado!",
            data: usuarioDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            res.status(404).send("Usuário não deletado. ID inválido")
        }
    }
})

// ROTA PARA LISTAR TODOS OS PACIENTES
app.get('/pacientes', async (request, response) => {
    try {
        const pacientes = await prismaClient.paciente.findMany();
        return response.json(pacientes)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA BUSCAR PACIENTES PELO ID
app.get("/pacientes/:id", async (request, response) => {
    try {
        const paciente = await prismaClient.paciente.findUnique({
            where: {
                id: Number(request.params.id),
            },
        })
        if (!paciente) return response.status(404).send('Paciente não encontrado. ID inválido')
        return response.json(paciente)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVOS PACIENTES

app.post("/pacientes", async (req, res) => {
  try {
    const { body } = req
    const bodyKeys = Object.keys(body) // Aqui pegamos todas as chaves do objeto e é gerado um array de strings para a gente, com o formato de ["chave1", "chave2".....]
    console.log(bodyKeys)
    for (const key of bodyKeys) {
      if (key !== "nome" &&
        key !== "cpf" &&
        key !== "telefone" &&
        key !== "email" &&
        key !== "data_nascimento" &&
        key !== "sexo" &&
        key !== "responsavel"
      ) return res.status(404).send("Colunas não existentes")
    }
    const pacientes = await prismaClient.paciente.create({
      data: {
        ...body,
        data_nascimento: new Date(body.data_nascimento),
      },
    })
    return res.status(201).json(pacientes)
  } catch (error) {
    console.error(error)
    if (error.code === "P2002") {
      res.status(404).send("Falha ao cadastrar paciente: Email já cadastrado!")
    }
  }
})

// ROTA PARA DELETAR PACIENTES PELO ID
app.delete("/pacientes/:id", async (req, res) => {
    const { params } = req
    try {
      const pacienteDeletado = await prismaClient.paciente.delete({
        where: {
          id: Number(params.id),
        },
      })
      res.status(200).json({
        message: "Paciente deletado!",
        data: pacienteDeletado
      })
    } catch (error) {
      if (error.code == "P2025") {
        res.status(404).send("Paciente não existe no banco")
      }
      if (error.code == "P2003") {
        res.status(404).send("Paciente não pode ser excluido, pois possui exames vinculados.")
      }
      res.status(500).send(error)
    }
  })

// ROTA PARA ATUALIZAR PACIENTES PELO ID
app.put("/pacientes/:id", async (req, res) => {
    try {
       const { body, params } = req
       const bodyKeys = Object.keys(body)
       for (const key of bodyKeys) {
        if (key !== "nome" &&
            key !== "cpf" &&
            key !== "telefone" &&
            key !== "email" &&
            key !== "data_nascimento" &&
            key !== "sexo" &&
            key !== "responsavel"
        ) return res.status(404).send("Colunas não existentes")
       }
       await prismaClient.paciente.update({
        where: {id: Number(params.id) },
        data: {
            ...body
        },
       })
       const pacienteAtualizado = await prismaClient.paciente.findUnique({
        where: {
            id: Number(params.id)
        }
       })
       return res.status(201).json({
        message: "Paciente atualizado!",
        data: pacienteAtualizado
       })
    } catch (error) {
        console.log(error)
        if (error.code === "P2002") {
            res.status(404).send("Falha ao atualizar paciente, este email já existe!")
        }
        if (error.code === "P2025") {
            res.status(404).send("Paciente não encontrado. ID inválido")
        }
        
    }
})

// ROTA PARA BUSCAR POR EXAMES
app.get("/exames", async (req, res) => {
    try {
        const exames = await prismaClient.exame.findMany();
        return res.json(exames)
    } catch (e) {
        console.log(e)
    }
})

app.get("/exames/:id", async (req, res)=>{
    try {
        const exame = await prismaClient.exame.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })
        if (!exame) return res.status(404).send('Exame não encontrado. ID inválido')
            return res.json(exame)
    } catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVOS EXAMES
app.post("/exames", async (req, res) => {
    try {
      const { body } = req
      const bodyKeys = Object.keys(body) // Aqui pegamos todas as chaves do objeto e é gerado um array de strings para a gente, com o formato de ["chave1", "chave2".....]
      console.log(bodyKeys)
      for (const key of bodyKeys) {
        if (key !== "tipo_exame" &&
          key !== "resultado" &&
          key !== "data_exame" &&
          key !== "link_arquivo" &&
          key !== "observacoes" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      const exames = await prismaClient.exame.create({
        data: {
          ...body,
          data_exame: new Date(body.data_exame),
        },
      })
      return res.status(201).json(exames)
    } catch (error) {
      console.error(error)
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar exame!")
      }
    }
  })

// ROTA PARA ATUALIZAR EXAMES PELO ID
app.put("/exames/:id", async (req, res) => {
    try {
      const { body, params } = req
      const bodyKeys = Object.keys(body)
      for (const key of bodyKeys) {
        if (key !== "tipo_exame" &&
          key !== "resultado" &&
          key !== "data_exame" &&
          key !== "link_arquivo" &&
          key !== "observacoes" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      await prismaClient.exame.update({
        where: { id: Number(params.id) },
        data: {
          ...body
        },
      })
      const exameAtualizado = await prismaClient.exame.findUnique({
        where: {
          id: Number(params.id)
        }
      })
  
      return res.status(201).json({
        message: "Paciente atualizado!",
        data: exameAtualizado
      })
  
    } catch (error) {
      if (error.code == "P2025") {
        res.status(404).send("Usuário não existe no banco")
      }
     
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar usuário: Email já cadastrado!")
      }
    }
  })

// ROTA PARA DELETAR EXAMES PELO ID
app.delete("/exames/:id", async (req, res) => {
    const { params } = req
    try {
        const exameDeletado = await prismaClient.exame.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Exame deletado!",
            data: exameDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            res.status(404).send("Exame não deletado. ID inválido")
        }
    }
})

// ROTA PARA BUSCAR TODAS CONSULTAS
app.get("/consultas", async (req, res) => {
    try {
        const consultas = await prismaClient.consulta.findMany();
        return res.json(consultas)
    } catch (e) {
        console.log(e)
    }
})

// ROTA PARA BUSCAR CONSULTAS PELO ID
app.get("/consultas/:id", async (request, response) => {
    try {
        const consulta = await prismaClient.consulta.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        if (!consulta) return response.status(404).send('Erro ao encontar consulta. ID inválido')
        return response.json(consulta)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVAS CONSULTAS
app.post("/consultas", async (req, res) => {
    try {
      const { body } = req
      const bodyKeys = Object.keys(body) // Aqui pegamos todas as chaves do objeto e é gerado um array de strings para a gente, com o formato de ["chave1", "chave2".....]
      console.log(bodyKeys)
      for (const key of bodyKeys) {
        if (key !== "motivo" &&
          key !== "data_consulta" &&
          key !== "observacoes" &&
          key !== "medico_responsavel_id" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      const consultas = await prismaClient.consulta.create({
        data: {
          ...body,
          data_consulta: new Date(body.data_consulta),
        },
      })
      return res.status(201).json(consultas)
    } catch (error) {
      console.error(error)
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar consulta!")
      }
    }
  })

app.put("/consultas/:id", async (req, res) => {
    try {
      const { body, params } = req
      const bodyKeys = Object.keys(body)
      for (const key of bodyKeys) {
        if (key !== "motivo" &&
          key !== "data_consulta" &&
          key !== "observacoes" &&
          key !== "medico_responsavel_id" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      await prismaClient.consulta.update({
        where: { id: Number(params.id) },
        data: {
          ...body
        },
      })
      const consultaAtualizado = await prismaClient.consulta.findUnique({
        where: {
          id: Number(params.id)
        }
      })
  
      return res.status(201).json({
        message: "Consulta atualizada!",
        data: consultaAtualizado
      })
  
    } catch (error) {
      if (error.code == "P2025") {
        res.status(404).send("consulta não existe no banco")
      }
     
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar consulta!")
      }
    }
  })

// ROTA PARA DELETAR CONSULTAS PELO ID
app.delete("/consultas/:id", async (req, res) => {
    const { params } = req
    try {
        const consultaDeletado = await prismaClient.consulta.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Consulta deletada!",
            data: consultaDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            res.status(404).send("Consulta não deletada. ID inválido")
        }
    }
})

// ROTA PARA BUSCAR TODOS PRONTUARIOS
app.get('/prontuarios', async (request, response) => {
    try {
        const prontuarios = await prismaClient.prontuario.findMany();
        return response.json(prontuarios)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA BUSCAR PRONTUARIOS PELO ID
app.get("/prontuarios/:id", async (request, response) => {
    try {
        const prontuario = await prismaClient.prontuario.findUnique({
            where: {
                id: Number(request.params.id),
            }
        })
        if (!prontuario) return response.status(404).send('Erro ao encontar prontuario. ID inválido')
        return response.json(prontuario)
    }
    catch (e) {
        console.log(e)
    }
})

// ROTA PARA CADASTRAR NOVOS PRONTUARIOS
app.post("/prontuarios", async (req, res) => {
    try {
      const { body } = req
      const bodyKeys = Object.keys(body) // Aqui pegamos todas as chaves do objeto e é gerado um array de strings para a gente, com o formato de ["chave1", "chave2".....]
      console.log(bodyKeys)
      for (const key of bodyKeys) {
        if (key !== "descricao" &&
          key !== "data" &&
          key !== "medico_responsavel_id" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      const prontuarios = await prismaClient.prontuario.create({
        data: {
          ...body,
          data: new Date(body.data),
        },
      })
      return res.status(201).json(prontuarios)
    } catch (error) {
      console.error(error)
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar prontuario!")
      }
    }
  })

// ROTA PARA ATUALIZAR PRONTUARIOS PELO ID
app.put("/prontuarios/:id", async (req, res) => {
    try {
      const { body, params } = req
      const bodyKeys = Object.keys(body)
      for (const key of bodyKeys) {
        if (key !== "descricao" &&
          key !== "data" &&
          key !== "medico_responsavel_id" &&
          key !== "paciente_id" 
        ) return res.status(404).send("Colunas não existentes")
      }
      await prismaClient.prontuario.update({
        where: { id: Number(params.id) },
        data: {
          ...body
        },
      })
      const prontuarioAtualizado = await prismaClient.prontuario.findUnique({
        where: {
          id: Number(params.id)
        }
      })
  
      return res.status(201).json({
        message: "Prontuario atualizado!",
        data: prontuarioAtualizado
      })
  
    } catch (error) {
      if (error.code == "P2025") {
        res.status(404).send("prontuario não existe no banco")
      }
     
      if (error.code === "P2002") {
        res.status(404).send("Falha ao cadastrar prontuario!")
      }
    }
  })
  
// ROTA PARA DELETAR PRONTUARIOS PELO ID
app.delete("/prontuarios/:id", async (req, res) => {
    const { params } = req
    try {
        const prontuarioDeletado = await prismaClient.prontuario.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Prontuario deletado!",
            data: prontuarioDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code === "P2025") {
            res.status(404).send("Prontuario não deletado. ID inválido")
        }
    }
})
app.listen(3000, () => console.log("Api rodando"))