import express from "express";
import CategoriaRoute from "./CategoriaRoute.js";
import PresentacionRoute from "./PresentacionRoute.js";
import ProveedorRoute from "./ProveedorRoute.js";

const router = express.Router();

router.use("/categoria", CategoriaRoute);
router.use("/presentacion", PresentacionRoute);
router.use("/proveedor", ProveedorRoute);

export default router;
