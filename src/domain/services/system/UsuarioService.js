import { ErrorApp } from "../../lib/error.js";
import moment from "moment";
import init from "../../init.js";
import auth from "../../../common/config/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.SECRET;

let Usuario;
let Roles;
let Menu;

const { models, transaction } = await init();
Usuario = models.usuario;
Roles = models.rol;
Menu = models.menu;

async function codificarContrasena(password) {
  return bcrypt.hash(password, auth.saltRounds);
}

async function verificarContrasena(password, hash) {
  return bcrypt.compare(password, hash);
}

function sign(payload, secret, callback) {
  return jwt.sign(payload, secret, callback);
}

function verify(token, secret, callback) {
  return jwt.verify(token, secret, callback);
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

async function loginUsuario(data) {
  console.log(secret);
  console.log(data);
  try {
    const usuarioBuscar = await Usuario.findOne({
      where: { usuario: data.usuario },
      include: [
        {
          model: Roles,
          as: "roles",
          attributes: ["id", "nombre", "descripcion", "estado"],
          include: [
            {
              model: Menu,
              as: "menus",
              through: { attributes: [] },
              attributes: ["id", "nombre", "ruta", "icono", "orden", "estado"],
              order: [["orden", "DESC"]],
            },
          ],
        },
      ],
      attributes: [
        "id",
        "tipoDocumento",
        "numeroDocumento",
        "complemento",
        "fechaNacimiento",
        "usuario",
        "nombres",
        "primerApellido",
        "segundoApellido",
        "telefono",
        "celular",
        "correoElectronico",
        "estado",
        "idRol",
        "userCreated",
        "contrasena",
      ],
    });
    if (!usuarioBuscar) throw new Error("El Usuario no existe");
    const usuario = usuarioBuscar.toJSON();

    const verificar = await verificarContrasena(
      data.contrasena,
      usuario.contrasena
    );
    if (!verificar) throw new Error("Error en el usuario o contraseña");

    const token = sign({ id: usuario.id }, secret, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    delete usuario.contrasena;
    usuario.token = token;

    return usuario;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export {
  crearUsuario,
  mostrarUsuario,
  eliminarUsuario,
  modificarUsuario,
  loginUsuario,
};
