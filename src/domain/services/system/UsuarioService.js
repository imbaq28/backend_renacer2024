import { ErrorApp } from "../../lib/error.js";
import moment from "moment";
import init from "../../init.js";
import auth from "../../../common/config/auth.js";
import bcrypt from "bcrypt";

let Usuario;
let Roles;

const { models, transaction } = await init();
Usuario = models.usuario;
Roles = models.rol;

async function codificarContrasena(password) {
  return bcrypt.hash(password, auth.saltRounds);
}

async function verificarContrasena(password, hash) {
  return bcrypt.compare(password, hash);
}

console.log("Usuario", Usuario);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function crearUsuario(data) {
  console.log(data);
  try {
    data.fechaNacimiento = moment(data.fechaNacimiento, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    if (data.contrasena) {
      data.contrasena = await codificarContrasena(data.contrasena);
      console.log(data.contrasena);
    }
    const usuario = await Usuario.create(data);
    // return UsuarioRepository.deleteItem(id);db, config);
    return usuario;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarUsuario(data) {
  try {
    console.log("data", data);
    const user = await Usuario.findAll({
      where: data,
      include: [
        {
          model: Roles,
          as: "roles",
          attributes: ["id", "nombre", "descripcion", "estado"],
        },
      ],
    });
    // return UsuarioRepository.deleteItem(id);
    return user;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarUsuario(datos) {
  try {
    console.log(datos);
    const {
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      nombres,
      primerApellido,
      segundoApellido,
      telefono,
      celular,
      correoElectronico,
      estado,
    } = datos;
    let newFechaNacimiento;
    if (fechaNacimiento) {
      newFechaNacimiento = moment(fechaNacimiento, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
    }
    const cat = await Usuario.update(
      {
        tipoDocumento,
        numeroDocumento,
        fechaNacimiento: newFechaNacimiento,
        nombres,
        primerApellido,
        segundoApellido,
        telefono,
        celular,
        correoElectronico,
        estado,
      },
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

async function eliminarUsuario(id) {
  try {
    const cat = await Usuario.findOne({
      where: {
        id,
      },
    });
    if (cat) {
      await Usuario.destroy({ where: { id } });
      return "Borrado";
    } else {
      throw new Error("El Usuario no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export { crearUsuario, mostrarUsuario, eliminarUsuario, modificarUsuario };
