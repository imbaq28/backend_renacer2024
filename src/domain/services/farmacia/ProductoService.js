import { ErrorApp } from "../../lib/error.js";
import { aJSON } from "../../../infrastructure/lib/util.js";
import init from "../../init.js";

let Producto;
let Categoria;
let NombreProducto;
let Proveedor;
let Presentacion;

const { models, transaction } = await init();
Producto = models.producto;
Categoria = models.categoria;
NombreProducto = models.nombreProducto;
Proveedor = models.proveedor;
Presentacion = models.presentacion;
console.log("Producto", Producto);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function crearProducto(data) {
  try {
    const cat = await Producto.create(data);
    // return UsuarioRepository.deleteItem(id);db, config);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarProducto(data) {
  try {
    console.log("data", data);
    let cat = await Producto.findAll({
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre", "detalle", "estado"],
        },
        {
          model: NombreProducto,
          as: "nombreProducto",
          attributes: ["id", "nombre", "estado"],
        },
        {
          model: Proveedor,
          as: "proveedor",
          attributes: [
            "id",
            "nombre",
            "direccion",
            "telefono",
            "nit",
            "estado",
          ],
        },
        {
          model: Presentacion,
          as: "presentacion",
          attributes: ["id", "nombre", "detalle", "estado"],
        },
      ],
    });
    // return UsuarioRepository.deleteItem(id);
    cat = aJSON(cat);
    // const inventario = [];
    const inventario = cat.reduce((acc, item) => {
      // Si ya existe un item con el mismo idNombre, suma el stock
      const existingItem = acc.find((i) => i.idNombre === item.idNombre);
      if (existingItem) {
        existingItem.stock += item.stock;
      } else {
        // Si no existe, agrega una copia del item al array acumulador
        acc.push({ ...item });
      }
      return acc;
    }, []);
    return inventario;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function buscarProducto(id) {
  try {
    const cat = await Producto.findOne({ id });
    // return UsuarioRepository.deleteItem(id);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarProducto(datos) {
  try {
    console.log(datos);
    const { nombre, detalle, estado } = datos;
    const cat = await Producto.update(
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

async function eliminarProducto(id) {
  try {
    const cat = await Producto.findOne({
      where: {
        id,
      },
    });
    if (cat) {
      await Producto.destroy({ where: { id } });
      return "Borrado";
    } else {
      throw new Error("El producto no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export {
  crearProducto,
  mostrarProducto,
  buscarProducto,
  eliminarProducto,
  modificarProducto,
};
