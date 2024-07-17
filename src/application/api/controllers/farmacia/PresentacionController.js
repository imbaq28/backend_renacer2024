import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearPresentacion,
  mostrarPresentacion,
  buscarPresentacion,
  eliminarPresentacion,
  modificarPresentacion,
} from "../../../../domain/services/farmacia/PresentacionService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    delete data.id;
    data.userCreated = req.user.id;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await crearPresentacion(data);
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
    const respuesta = await mostrarPresentacion();
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function buscar(req, res) {
  try {
    const id = req.params;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await buscarPresentacion(id);
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
    const respuesta = await modificarPresentacion(datos);
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
    const respuesta = await eliminarPresentacion(data);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { crear, mostrar, buscar, eliminar, modificar };
