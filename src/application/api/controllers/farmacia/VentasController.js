import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
import {
  crearVentas,
  mostrarVentas,
  eliminarCompras,
  modificarCompras,
} from "../../../../domain/services/farmacia/VentasService.js";

async function crear(req, res) {
  try {
    const data = req.body;
    delete data.id;
    // data.userCreated = req.user.idUsuario;
    const respuesta = await crearVentas(data);
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
    const respuesta = await mostrarVentas();
    return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
  } catch (error) {
    return res
      .status(error.httpCode || HttpCodes.userError)
      .json(new Respuesta(error.message, Finalizado.FAIL));
  }
}

// async function modificar(req, res) {
//   try {
//     const datos = req.body;
//     datos.id = req.params.id;
//     // data.userCreated = req.user.idUsuario;
//     const respuesta = await modificarCompras(datos);
//     return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
//   } catch (error) {
//     return res
//       .status(error.httpCode || HttpCodes.userError)
//       .json(new Respuesta(error.message, Finalizado.FAIL));
//   }
// }

// async function eliminar(req, res) {
//   try {
//     const id = req.params.id;
//     console.log("id", id);
//     // const data = req.body;
//     // data.userCreated = req.user.idUsuario;
//     const respuesta = await eliminarCompras(id);
//     return res.status(200).send(new Respuesta("OK", Finalizado.OK, respuesta));
//   } catch (error) {
//     return res
//       .status(error.httpCode || HttpCodes.userError)
//       .json(new Respuesta(error.message, Finalizado.FAIL));
//   }
// }

export { crear, mostrar };
