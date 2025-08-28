import { Router } from "express";
import { usuarioController } from "../controller/Usuario/UsuarioController.js";
export const usuarioRouter = Router()

usuarioRouter.get('/usuarios', usuarioController.getTodosOsUsuarios);

usuarioRouter.get("/usuarios/:id", usuarioController.getUsuarioPorId)

usuarioRouter.post("/usuarios", usuarioController.criarUsuarios)

usuarioRouter.put("/usuarios/:id", usuarioController.atualizarUsuarios)

usuarioRouter.delete("/usuarios/:id", usuarioController.deletarUsuarios)