import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearRoles,
  mostrarRoles,
  eliminarRoles,
  modificarRoles,
  agregarMenuRol,
} from "../../../../domain/services/system/RolesService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    delete data.id;
    data.userCreated = req.user.id;
    // data.userCreated = req.user.idRoles;
    const respuesta = await crearRoles(data);
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
    // data.userCreated = req.user.idRoles;
    const respuesta = await mostrarRoles();
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
    // data.userCreated = req.user.idRoles;
    const respuesta = await modificarRoles(datos);
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
    // data.userCreated = req.user.idRoles;
    const respuesta = await eliminarRoles(data);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function agregarMenu(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const valores = {};
    valores.userCreated = req.user.id;
    valores.deletedAt = new Date();
    const respuesta = await agregarMenuRol({ id, data, valores });
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { crear, mostrar, eliminar, modificar, agregarMenu };
