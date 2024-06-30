import { ErrorApp } from "../../lib/error.js";
import moment from "moment";
import init from "../../init.js";

let Roles;
let RolMenu;
let Menu;

const { models, transaction } = await init();
Roles = models.rol;
RolMenu = models.rolMenu;
Menu = models.menu;

console.log("Roles", Roles);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function crearRoles(data) {
  try {
    data.fechaNacimiento = moment(
      data.fechaNacimiento || new Date(),
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
    console.log(data.fechaNacimiento);
    const rol = await Roles.create(data);
    // return RolesRepository.deleteItem(id);db, config);
    return rol;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarRoles(data) {
  try {
    console.log("data", data);
    const cat = await Roles.findAll({
      include: [
        {
          model: Menu,
          as: "menus",
          through: { attributes: [] },
          attributes: ["id", "nombre", "ruta", "icono", "orden", "estado"],
          order: [["orden", "DESC"]],
        },
      ],
    });
    // return RolesRepository.deleteItem(id);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarRoles(datos) {
  try {
    console.log(datos);
    const { nombre, descripcion, estado } = datos;

    const rol = await Roles.update(
      {
        nombre,
        descripcion,
        estado,
      },
      { where: { id: datos.id }, returning: true }
    );
    console.log("rol", rol[0]);
    if (rol[0] === 1) {
      return rol[1][0];
    } else {
      throw new Error("No se pudo actualizar");
    }
    // return RolesRepository.deleteItem(id);
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function eliminarRoles(id) {
  try {
    const cat = await Roles.findOne({
      where: {
        id,
      },
    });
    if (cat) {
      await Roles.destroy({ where: { id } });
      return "Borrado";
    } else {
      throw new Error("El Roles no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function agregarMenuRol(datos) {
  try {
    const { data, id } = datos;
    const roles = await Roles.findOne({ where: { id: id } });
    if (!roles) throw new Error("El Rol no existe");

    const todosMenu = await RolMenu.findAll({ where: { idRol: id } });
    const menuJson = todosMenu.map((r) => r.toJSON());

    if (menuJson.length > 0) {
      for (const men of menuJson) {
        await RolMenu.destroy({ where: { id: men.id } });
      }
    }
    for (const menuRol of data) {
      await RolMenu.create({ idRol: id, idMenu: menuRol });
    }

    const rolMenu = await RolMenu.findAll({ where: { idRol: id } });

    return rolMenu;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export {
  crearRoles,
  mostrarRoles,
  eliminarRoles,
  modificarRoles,
  agregarMenuRol,
};
