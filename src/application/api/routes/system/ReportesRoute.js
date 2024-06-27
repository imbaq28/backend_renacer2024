import express from "express";
import {
  fechaVencimiento,
  cantidadMinima,
} from "../../controllers/system/ReportesController.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;
router.get("/fecha-vencimiento", fechaVencimiento);
router.get("/cantidad-minima", cantidadMinima);

export default router;
