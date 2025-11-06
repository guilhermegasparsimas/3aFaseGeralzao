// Path: src/routes/usuarios.js

import { Router } from "express";
import {
  getTodosOsUsuarios,
  getUsuarioPorId,
  getUsuarioPorEmail,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
} from "../controller/Usuario/UsuarioController.js";

export const usuarioRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas protegidas para gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna a lista de usuários
 *       401:
 *         description: Token inválido ou ausente
 */
usuarioRouter.get("/usuarios", getTodosOsUsuarios);
usuarioRouter.get("/usuarios/byemail/", getUsuarioPorEmail);
usuarioRouter.get("/usuarios/:id", getUsuarioPorId);
usuarioRouter.post("/usuarios", criarUsuario);
usuarioRouter.put("/usuarios/:id", atualizarUsuario);
usuarioRouter.delete("/usuarios/:id", deletarUsuario);
