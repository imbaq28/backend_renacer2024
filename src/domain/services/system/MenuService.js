import { ErrorApp } from "../../lib/error.js";
import moment from "moment";
import init from "../../init.js";

let Menu;

const { models, transaction } = await init();
Menu = models.menu;

console.log("Menu", Menu);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function crearMenu(data) {
  try {
    const menu = Menu.create(data);
    // return MenuRepository.deleteItem(id);db, config);
    return menu;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarMenu(data) {
  try {
    console.log("data", data);
    const cat = await Menu.findAll({
      order: [["orden", "ASC"]],
    });
    // return MenuRepository.deleteItem(id);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarMenu(datos) {
  try {
    console.log(datos);
    const { nombre, descripcion, estado } = datos;

    const menu = await Menu.update(datos, {
      where: { id: datos.id },
      returning: true,
    });
    console.log("menu", menu[0]);
    if (menu[0] === 1) {
      return menu[1][0];
    } else {
      throw new Error("No se pudo actualizar");
    }
    // return MenuRepository.deleteItem(id);
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function eliminarMenu(data) {
  try {
    data.deletedAt = new Date();
    const menu = await Menu.findOne({
      where: {
        id: data.id,
      },
    });
    if (menu) {
      await Menu.update(data, {
        where: { id: data.id },
      });
      return "Borrado";
    } else {
      throw new Error("El Menu no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export { crearMenu, mostrarMenu, eliminarMenu, modificarMenu };
