import express from "express";
import {
  fechaVencimiento,
  cantidadMinima,
  generarFactura,
} from "../../controllers/system/ReportesController.js";
import { verificarToken } from "../../middlewares/AuthMiddleware.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;
router.get("/fecha-vencimiento", verificarToken, fechaVencimiento);
router.get("/cantidad-minima", verificarToken, cantidadMinima);
router.get("/:id/generar-factura", verificarToken, generarFactura);

export default router;
