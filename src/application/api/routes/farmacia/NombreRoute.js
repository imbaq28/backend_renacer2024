import express from "express";
import {
  crear,
  mostrar,
  modificar,
  eliminar,
} from "../../controllers/farmacia/NombreController.js";
import { verificarToken } from "../../middlewares/AuthMiddleware.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;
// console.log("API", api);
router.post("/", verificarToken, crear);
router.get("/", verificarToken, mostrar);
router.put("/:id", verificarToken, modificar);
router.delete("/:id", verificarToken, eliminar);

export default router;
