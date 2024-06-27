import { ErrorApp } from "../../lib/error.js";
import moment from "moment";
import init from "../../init.js";

let Roles;

const { models, transaction } = await init();
Roles = models.rol;

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
    const cat = await Roles.findAll({});
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

export { crearRoles, mostrarRoles, eliminarRoles, modificarRoles };
