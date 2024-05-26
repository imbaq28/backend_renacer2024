import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearCategoria,
  mostrarCategoria,
  buscarCategoria,
  eliminarCategoria,
  modificarCategoria,
} from "../../../../domain/services/farmacia/CategoriaService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    // data.userCreated = req.user.idUsuario;
    delete data.id;
    const respuesta = await crearCategoria(data);
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
    const respuesta = await mostrarCategoria();
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
    const respuesta = await buscarCategoria(id);
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
    // data.userCreated = req.user.idUsuario;
    const respuesta = await modificarCategoria(datos);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function eliminar(req, res) {
  try {
    const id = req.params.id;
    console.log("id", id);
    // const data = req.body;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await eliminarCategoria(id);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { crear, mostrar, buscar, eliminar, modificar };
