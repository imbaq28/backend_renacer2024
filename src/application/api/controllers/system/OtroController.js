import { Finalizado, HttpCodes } from "../../../lib/global.js";
import { Respuesta } from "../../../lib/respuesta.js";
// import UsuarioService from "../../../../domain/services/system/usuario.service.js";

function setupUsuarioController(services) {
  async function crear(req, res) {
    try {
      const data = req.body;
      // data.userCreated = req.user.idUsuario;
      // const respuesta = await UsuarioService.createOrUpdate(data);
      const respuesta = "test";
      return res
        .status(200)
        .send(new Respuesta("OK", Finalizado.OK, respuesta));
    } catch (error) {
      return res
        .status(error.httpCode || HttpCodes.userError)
        .json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return { crear };
}

export default setupUsuarioController;
