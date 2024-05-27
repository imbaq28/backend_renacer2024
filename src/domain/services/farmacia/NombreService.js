import { ErrorApp } from "../../lib/error.js";
import init from "../../init.js";

let Nombre;

const { models, transaction } = await init();
Nombre = models.nombreProducto;
console.log("nombre", Nombre);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function crearNombre(data) {
  try {
    const cat = await Nombre.create(data);
    // return UsuarioRepository.deleteItem(id);db, config);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarNombre(data) {
  try {
    console.log("data", data);
    const cat = await Nombre.findAll();
    // return UsuarioRepository.deleteItem(id);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarNombre(datos) {
  try {
    console.log(datos);
    const { nombre, detalle, estado } = datos;
    const cat = await Nombre.update(
      { nombre: nombre, detalle: detalle, estado: estado },
      { where: { id: datos.id }, returning: true }
    );
    console.log("cat", cat[0]);
    if (cat[0] === 1) {
      return cat[1][0];
    } else {
      throw new Error("No se pudo actualizar");
    }
    // return UsuarioRepository.deleteItem(id);
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function eliminarNombre(id) {
  try {
    const cat = await Nombre.findOne({
      where: {
        id,
      },
    });
    if (cat) {
      await Nombre.destroy({ where: { id } });
      return "Borrado";
    } else {
      throw new Error("El nombre no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export { crearNombre, mostrarNombre, eliminarNombre, modificarNombre };
