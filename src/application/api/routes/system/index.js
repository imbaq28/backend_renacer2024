import express from "express";
import UsuarioRoute from "./UsuarioRoute.js";
import RolesRoute from "./RolesRoute.js";
import ReportesRoute from "./ReportesRoute.js";
import MenuRoute from "./MenuRoute.js";

const router = express.Router();

router.use("/usuario", UsuarioRoute);
router.use("/roles", RolesRoute);
router.use("/reportes", ReportesRoute);
router.use("/menu", MenuRoute);

export default router;
