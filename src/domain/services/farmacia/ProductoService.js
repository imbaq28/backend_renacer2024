import { ErrorApp } from "../../lib/error.js";
import { aJSON } from "../../../infrastructure/lib/util.js";
import init from "../../init.js";

let Producto;
let Categoria;
let Nombre;
let Proveedor;
let Presentacion;
let Compras;

const { models, transaction } = await init();
Producto = models.producto;
Categoria = models.categoria;
Nombre = models.nombreProducto;
Proveedor = models.proveedor;
Presentacion = models.presentacion;
Compras = models.compras;

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
    let productos = await Producto.findAll({
      include: [
        {
          model: Nombre,
          as: "nombreProducto",
          attributes: [
            "id",
            "idPresentacion",
            "idCategoria",
            "nombreQuimico",
            "descripcion",
            "imagen",
            "estado",
          ],
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
        },
        {
          model: Compras,
          as: "detalles",
          attributes: [
            "id",
            "idNombre",
            "cantidad",
            "observaciones",
            "fechaVencimiento",
            "lote",
            "precioCompra",
            "idProveedor",
            "estado",
          ],
          limit: 5,
          order: [["createdAt", "DESC"]],
          include: [
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
          ],
        },
      ],
    });
    // return UsuarioRepository.deleteItem(id);

    return productos;
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
    const { precioVenta, precioUnitario, estado } = datos;
    const cat = await Producto.update(
      { precioVenta, precioUnitario, estado },
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

async function modificarProductoStock(datos) {
  try {
    console.log(datos);
    const { stock } = datos;
    const cat = await Producto.update(
      { stock },
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
  modificarProductoStock,
};
