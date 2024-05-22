import { ErrorApp } from "../../lib/error.js";

const { UsuarioRepository } = repositories;

async function eliminar(id) {
  try {
    return UsuarioRepository.deleteItem(id);
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export { eliminar };
