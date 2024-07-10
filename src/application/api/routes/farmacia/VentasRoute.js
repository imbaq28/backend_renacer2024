import express from "express";
import { crear, mostrar } from "../../controllers/farmacia/VentasController.js";
import { verificarToken } from "../../middlewares/AuthMiddleware.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;
// console.log("API", api);
router.post("/", verificarToken, crear);
router.get("/", verificarToken, mostrar);
// router.put("/:id", modificar);
// router.delete("/:id", eliminar);

export default router;
