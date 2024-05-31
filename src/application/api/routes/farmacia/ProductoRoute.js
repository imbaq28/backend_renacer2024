import express from "express";
import {
  crear,
  mostrar,
  modificar,
  modificarStock,
  buscar,
  eliminar,
} from "../../controllers/farmacia/ProductoController.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;

// router.post("/", crear);
router.get("/", mostrar);
router.put("/:id", modificar);
router.put("/:id/stock", modificarStock);
router.get("/:id", buscar);
// router.delete("/:id", eliminar);

export default router;
