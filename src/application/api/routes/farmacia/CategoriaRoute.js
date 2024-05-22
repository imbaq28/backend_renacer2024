import express from "express";
import {
  crear,
  mostrar,
  modificar,
  buscar,
  eliminar,
} from "../../controllers/farmacia/CategoriaController.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;
// console.log("API", api);
router.post("/", crear);
router.get("/", mostrar);
router.put("/:id", modificar);
router.get("/:id", buscar);
router.delete("/:id", eliminar);

export default router;
