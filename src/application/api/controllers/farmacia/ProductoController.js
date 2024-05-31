import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearProducto,
  mostrarProducto,
  buscarProducto,
  eliminarProducto,
  modificarProducto,
  modificarProductoStock,
} from "../../../../domain/services/farmacia/ProductoService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    // data.userCreated = req.user.idUsuario;
    delete data.id;
    const respuesta = await crearProducto(data);
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
    const respuesta = await mostrarProducto();
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
    const respuesta = await buscarProducto(id);
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
    const respuesta = await modificarProducto(datos);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

async function modificarStock(req, res) {
  try {
    const datos = req.body;
    datos.id = req.params.id;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await modificarProductoStock(datos);
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
    const respuesta = await eliminarProducto(id);
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

export { crear, mostrar, buscar, eliminar, modificar, modificarStock };
