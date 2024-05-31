import { ErrorApp } from "../../lib/error.js";
import init from "../../init.js";

let Compras;
let Proveedor;
let Nombre;
let Presentacion;
let Categoria;

const { models, transaction } = await init();
Compras = models.compras;
Proveedor = models.proveedor;
Nombre = models.nombreProducto;
Presentacion = models.presentacion;
Categoria = models.categoria;

console.log("compras", Compras);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function crearCompras(data) {
  try {
    const cat = await Compras.create(data);
    // return UsuarioRepository.deleteItem(id);db, config);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarCompras(data) {
  try {
    console.log("data", data);
    const cat = await Compras.findAll({
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
      ],
    });
    // return UsuarioRepository.deleteItem(id);
    return cat;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarCompras(datos) {
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
    const cat = await Compras.update(
      {
        nombre,
        idPresentacion,
        idCategoria,
        nombreQuimico,
        descripcion,
        imagen,
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

async function eliminarCompras(id) {
  try {
    const cat = await Compras.findOne({
      where: {
        id,
      },
    });
    if (cat) {
      await Compras.destroy({ where: { id } });
      return "Borrado";
    } else {
      throw new Error("El id de compras no existe");
    }
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export { crearCompras, mostrarCompras, eliminarCompras, modificarCompras };
