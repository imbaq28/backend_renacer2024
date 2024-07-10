import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearCompras,
  mostrarCompras,
  eliminarCompras,
  modificarCompras,
} from "../../../../domain/services/farmacia/ComprasService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    data.userCreated = req.user.id;
    delete data.id;
    // data.userCreated = req.user.idUsuario;
    delete data.id;
    const respuesta = await crearCompras(data);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function mostrar(req, res) {
  try {
    // const data = req.body;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await mostrarCompras();
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function modificar(req, res) {
  try {
    const datos = req.body;
    datos.userUpdated = req.user.id;
    datos.id = req.params.id;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await modificarCompras(datos);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function eliminar(req, res) {
  try {
    const datos = {}
    console.log("id", req.user.id);
    datos.userDeleted = req.user.id;
    datos.id = req.params.id;
    // const data = req.body;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await eliminarCompras(datos);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { crear, mostrar, eliminar, modificar };
