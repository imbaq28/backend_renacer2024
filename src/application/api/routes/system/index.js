import express from "express";
import UsuarioRoute from "./UsuarioRoute.js";
import RolesRoute from "./RolesRoute.js";

const router = express.Router();

router.use("/usuario", UsuarioRoute);
router.use("/roles", RolesRoute);

export default router;
