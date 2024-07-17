import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearUsuario,
  mostrarUsuario,
  eliminarUsuario,
  modificarUsuario,
  cambiarContrasenaUsuario,
  loginUsuario,
} from "../../../../domain/services/system/UsuarioService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    delete data.id;
    data.userCreated = req.user.id;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await crearUsuario(data);
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
    const data = req.query;
    const respuesta = await mostrarUsuario(data);
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
    const respuesta = await modificarUsuario(datos);
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
    const respuesta = await eliminarUsuario(data);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function cambiarContrasena(req, res) {
  try {
    const datos = req.body;
    datos.userUpdated = req.user.id;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await cambiarContrasenaUsuario(datos);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function login(req, res) {
  try {
    const data = req.body;
    // delete data.id;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await loginUsuario(data);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { crear, mostrar, eliminar, modificar, login, cambiarContrasena };
