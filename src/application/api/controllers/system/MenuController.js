import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearMenu,
  mostrarMenu,
  eliminarMenu,
  modificarMenu,
} from "../../../../domain/services/system/MenuService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    delete data.id;
    data.userCreated = req.user.id;
    // data.userCreated = req.user.idMenu;
    const respuesta = await crearMenu(data);
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
    // data.userCreated = req.user.idMenu;
    const respuesta = await mostrarMenu();
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
    // data.userCreated = req.user.idMenu;
    const respuesta = await modificarMenu(datos);
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
    // data.userCreated = req.user.idMenu;
    const respuesta = await eliminarMenu(data);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { crear, mostrar, eliminar, modificar };
