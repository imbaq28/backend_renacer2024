import { ErrorApp } from "../../lib/error.js";
import init from "../../init.js";

let Categoria;

const { models, transaction } = await init();
Categoria = models.categoria;
console.log("categoria", Categoria);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function crearCategoria(data) {
  try {
    const cat = await Categoria.create(data);
    // return UsuarioRepository.deleteItem(id);db, config);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarCategoria(data) {
  try {
    console.log("data", data);
    const cat = await Categoria.findAll({
      order: [["createdAt", "DESC"]],
    });
    // return UsuarioRepository.deleteItem(id);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function buscarCategoria(id) {
  try {
    const cat = await Categoria.findOne({ id });
    // return UsuarioRepository.deleteItem(id);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarCategoria(datos) {
  try {
    console.log(datos);
    const { nombre, detalle, estado } = datos;
    const cat = await Categoria.update(datos, {
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

async function eliminarCategoria(data) {
  try {
    console.log(data);
    data.deletedAt = new Date();
    const cat = await Categoria.findOne({
      where: {
        id: data.id,
      },
    });
    if (cat) {
      await Categoria.update(data, {
        where: { id: data.id },
      });
      // await Categoria.destroy({ where: { id: data.id } });
      return "Borrado";
    } else {
      throw new Error("La categoria no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export {
  crearCategoria,
  mostrarCategoria,
  buscarCategoria,
  eliminarCategoria,
  modificarCategoria,
};
