import express from "express";
import { crear } from "../../controllers/system/usuario.controller.js";
const api = express.Router();

api.post("/usuario", crear);

export default api;
