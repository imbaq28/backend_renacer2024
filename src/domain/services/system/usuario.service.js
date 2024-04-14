import { ErrorApp } from "../../lib/error.js";

const UsuarioService = {
  createOrUpdate: async function createOrUpdate(data) {
    try {
      console.log("creando usuario");
      return data;
    } catch (error) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(error.message, 400);
    }
  },
};

export default UsuarioService;
