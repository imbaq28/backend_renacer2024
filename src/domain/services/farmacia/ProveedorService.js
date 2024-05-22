import { ErrorApp } from "../../lib/error.js";
import init from "../../init.js";

let Proveedor;

const { models, transaction } = await init();
Proveedor = models.proveedor;

async function crearProveedor(data) {
  try {
    console.log(data);
    const proveed = await Proveedor.create(data);
    // return UsuarioRepository.deleteItem(id);db, config);
    return proveed;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarProveedor(data) {
  try {
    const proveed = await Proveedor.findAll(data);
    // return UsuarioRepository.deleteItem(id);
    return proveed;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function buscarProveedor(id) {
  try {
    const proveed = await Proveedor.findOne({ id });
    // return UsuarioRepository.deleteItem(id);
    return proveed;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarProveedor(datos) {
  try {
    const { nombre, direccion, telefono, nit, estado } = datos;
    const proveed = await Proveedor.update(
      { nombre, direccion, telefono, nit, estado },
      { where: { id: datos.id }, returning: true }
    );
    if (proveed[0] === 1) {
      return proveed[1][0];
    } else {
      throw new Error("No se pudo actualizar");
    }
    // return UsuarioRepository.deleteItem(id);
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function eliminarProveedor(id) {
  try {
    const proveed = await Proveedor.findOne({
      where: {
        id,
      },
    });
    if (proveed) {
      await Proveedor.destroy({ where: { id } });
      return "Borrado";
    } else {
      throw new Error("El proveedor no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export {
  crearProveedor,
  mostrarProveedor,
  buscarProveedor,
  eliminarProveedor,
  modificarProveedor,
};
