import { ErrorApp } from "../../lib/error.js";
import init from "../../init.js";

let Presentacion;

const { models, transaction } = await init();
Presentacion = models.presentacion;

async function crearPresentacion(data) {
  try {
    console.log(data);
    const presentac = await Presentacion.create(data);
    // return UsuarioRepository.deleteItem(id);db, config);
    return presentac;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarPresentacion(data) {
  try {
    const presentac = await Presentacion.findAll(data);
    // return UsuarioRepository.deleteItem(id);
    return presentac;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function buscarPresentacion(id) {
  try {
    const presentac = await Presentacion.findOne({ id });
    // return UsuarioRepository.deleteItem(id);
    return presentac;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarPresentacion(datos) {
  try {
    const { nombre, detalle, estado } = datos;
    const presentac = await Presentacion.update(datos, {
      where: { id: datos.id },
      returning: true,
    });
    if (presentac[0] === 1) {
      return presentac[1][0];
    } else {
      throw new Error("No se pudo actualizar");
    }
    // return UsuarioRepository.deleteItem(id);
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function eliminarPresentacion(data) {
  try {
    data.deletedAt = new Date();
    const presentac = await Presentacion.findOne({
      where: {
        id: data.id,
      },
    });
    if (presentac) {
      await Presentacion.update(data, {
        where: { id: data.id },
      });
      return "Borrado";
    } else {
      throw new Error("La presentacion no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export {
  crearPresentacion,
  mostrarPresentacion,
  buscarPresentacion,
  eliminarPresentacion,
  modificarPresentacion,
};
