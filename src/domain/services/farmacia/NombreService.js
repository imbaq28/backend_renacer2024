import { ErrorApp } from "../../lib/error.js";
import init from "../../init.js";

let Nombre;
let Presentacion;
let Categoria;

const { models, transaction } = await init();
Nombre = models.nombreProducto;
Presentacion = models.presentacion;
Categoria = models.categoria;

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
    const cat = await Nombre.findAll({
      include: [
        {
          model: Presentacion,
          as: "presentacion",
          attributes: ["id", "nombre", "detalle", "estado"],
        },
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre", "detalle", "estado"],
        },
      ],
    });
    // return UsuarioRepository.deleteItem(id);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarNombre(datos) {
  try {
    console.log(datos);
    const {
      nombre,
      idPresentacion,
      idCategoria,
      nombreQuimico,
      descripcion,
      imagen,
      estado,
    } = datos;
    const cat = await Nombre.update(datos, {
      where: { id: datos.id },
      returning: true,
    });
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

async function eliminarNombre(data) {
  try {
    data.deletedAt = new Date();
    const cat = await Nombre.findOne({
      where: {
        id: data.id,
      },
    });
    if (cat) {
      await Nombre.update(data, {
        where: { id: data.id },
      });
      return "Borrado";
    } else {
      throw new Error("El nombre no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export { crearNombre, mostrarNombre, eliminarNombre, modificarNombre };
