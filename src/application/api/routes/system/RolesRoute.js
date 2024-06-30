import express from "express";
import {
  crear,
  mostrar,
  eliminar,
  modificar,
  agregarMenu,
} from "../../controllers/system/RolesController.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;
// console.log("API", api);
router.post("/", crear);
router.get("/", mostrar);
router.put("/:id", modificar);
router.delete("/:id", eliminar);
router.post("/:id/agregar-menu", agregarMenu);

export default router;
