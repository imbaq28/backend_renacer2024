import express from "express";
import CategoriaRoute from "./CategoriaRoute.js";
import PresentacionRoute from "./PresentacionRoute.js";
import ProveedorRoute from "./ProveedorRoute.js";
import NombreRoute from "./NombreRoute.js";
import ProductoRoute from "./ProductoRoute.js";

const router = express.Router();

router.use("/categoria", CategoriaRoute);
router.use("/presentacion", PresentacionRoute);
router.use("/proveedores", ProveedorRoute);
router.use("/nombre", NombreRoute);
router.use("/producto", ProductoRoute);

export default router;
