import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearNombre,
  mostrarNombre,
  eliminarNombre,
  modificarNombre,
} from "../../../../domain/services/farmacia/NombreService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    delete data.id;
    data.userCreated = req.user.id;
    // data.userCreated = req.user.idUsuario;
    delete data.id;
    const respuesta = await crearNombre(data);
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
    const respuesta = await mostrarNombre();
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
    datos.id = req.params.id;
    datos.userUpdated = req.user.id;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await modificarNombre(datos);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function eliminar(req, res) {
  try {
    const data = {};
    data.id = req.params.id;
    data.userDeleted = req.user.id;
    // const data = req.body;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await eliminarNombre(data);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { crear, mostrar, eliminar, modificar };
