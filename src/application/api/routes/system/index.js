import express from "express";
import UsuarioRoute from "./UsuarioRoute.js";

const router = express.Router();

router.use("/usuario", UsuarioRoute);

export default router;
