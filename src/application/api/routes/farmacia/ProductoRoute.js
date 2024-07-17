import express from "express";
import {
  crear,
  mostrar,
  modificar,
  modificarStock,
  buscar,
  eliminar,
} from "../../controllers/farmacia/ProductoController.js";
import { verificarToken } from "../../middlewares/AuthMiddleware.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;

// router.post("/", crear);
router.get("/", verificarToken, mostrar);
router.put("/:id", verificarToken, modificar);
router.put("/:id/stock", verificarToken, modificarStock);
router.get("/:id", buscar);
// router.delete("/:id", eliminar);

export default router;
