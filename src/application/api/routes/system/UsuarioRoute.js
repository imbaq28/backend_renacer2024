import express from "express";
import { crear } from "../../controllers/system/UsuarioController.js";

const router = express.Router();
// const { UsuarioController } = controllers;
// const { AuthMiddleware } = middlewares;
// console.log("API", api);
router.get("/usuario", crear);

export default router;
