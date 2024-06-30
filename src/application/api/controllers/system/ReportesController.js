import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  fechaVencimientoService,
  cantidadMinimaService,
  generarFacturaService,
} from "../../../../domain/services/system/ReportesService.js";

async function fechaVencimiento(req, res) {
  try {
    // const data = req.body;
    // data.userCreated = req.user.idRoles;
    const respuesta = await fechaVencimientoService();
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function cantidadMinima(req, res) {
  try {
    // const data = req.body;
    // data.userCreated = req.user.idRoles;
    const respuesta = await cantidadMinimaService();
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function generarFactura(req, res) {
  try {
    const id = req.params.id;
    // const data = req.body;
    // data.userCreated = req.user.idRoles;
    const respuesta = await generarFacturaService(id);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { fechaVencimiento, cantidadMinima, generarFactura };
