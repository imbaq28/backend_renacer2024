import express from "express";
import {
  crear,
  mostrar,
  eliminar,
  modificar,
  cambiarContrasena,
  login,
} from "../../controllers/system/UsuarioController.js";
import { verificarToken } from "../../middlewares/AuthMiddleware.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;
// console.log("API", api);
router.post("/", verificarToken, crear);
router.get("/", verificarToken, mostrar);
router.put("/:id", verificarToken, modificar);
router.delete("/:id", verificarToken, eliminar);
router.post("/login", login);
router.post("/cambiar-contrasena", verificarToken, cambiarContrasena);

export default router;
