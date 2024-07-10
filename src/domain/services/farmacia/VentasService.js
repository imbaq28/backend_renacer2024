import { ErrorApp } from "../../lib/error.js";
import init from "../../init.js";
import moment from "moment";

let Compras;
let Proveedor;
let Nombre;
let Presentacion;
let Categoria;
let Producto;
let Pedidos;
let PedidoProducto;
let Usuario;

const { models, transaction } = await init();
Compras = models.compras;
Proveedor = models.proveedor;
Nombre = models.nombreProducto;
Presentacion = models.presentacion;
Categoria = models.categoria;
Producto = models.producto;
Pedidos = models.pedidos;
PedidoProducto = models.pedidoProducto;
Usuario = models.usuario;

console.log("Pedidos", Pedidos);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function crearVentas(data) {
  let t;
  try {
    t = await transaction.create();
    const pedidos = await Pedidos.findAll();
    data.numeroFactura = pedidos.length + 1;
    data.fechaPedido = moment().format("YYYY-MM-DD");
    const nuevoPedido = await Pedidos.create(data, { transaction: t });
    for (const producto of data.productos) {
      const productoActual = await Producto.findOne({
        where: { id: producto.idProducto },
      });
      if (productoActual.stock > producto.cantidad) {
        producto.idPedido = nuevoPedido.id;
        producto.userCreated = data.userCreated;
        await PedidoProducto.create(producto, { transaction: t });
        await Producto.update(
          {
            stock: parseInt(productoActual.stock) - parseInt(producto.cantidad),
            userUpdated: data.userCreated,
          },
          { where: { id: productoActual.id }, transaction: t }
        );
      } else {
        throw new Error("El stock supera a la cantidad");
      }
    }
    // const compras = await Compras.create(data);
    // const producto = await Producto.findOne({
    //   where: { idNombre: compras.idNombre },
    // });
    // if (!producto) {
    //   await Producto.create({
    //     idNombre: compras.idNombre,
    //     stock: compras.cantidad,
    //   });
    // } else {
    //   const total = parseInt(producto.stock) + parseInt(compras.cantidad);
    //   await Producto.update(
    //     {
    //       stock: total,
    //     },
    //     { where: { id: producto.id }, returning: true }
    //   );
    // }
    await transaction.commit(t);
    return nuevoPedido;
  } catch (error) {
    console.log("antes del rollback");
    await transaction.rollback(t);
    throw new ErrorApp(error.message, 400);
  }
}

async function mostrarVentas(data) {
  try {
    console.log("data", data);
    const pedidos = await Pedidos.findAll({
      include: [
        {
          model: Producto,
          as: "productos",
          through: { attributes: ["id", "cantidad", "total"] },
          attributes: ["id"],
          include: [
            {
              model: Nombre,
              as: "nombreProducto",
              attributes: [
                "id",
                "nombre",
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
        },
        {
          model: Usuario,
          as: "cliente",
          attributes: [
            "id",
            "numeroDocumento",
            "complemento",
            "fechaNacimiento",
            "usuario",
            "nombres",
            "primerApellido",
            "segundoApellido",
            "celular",
            "correoElectronico",
          ],
        },
        {
          model: Usuario,
          as: "vendedor",
          attributes: [
            "id",
            "numeroDocumento",
            "complemento",
            "fechaNacimiento",
            "usuario",
            "nombres",
            "primerApellido",
            "segundoApellido",
            "celular",
            "correoElectronico",
          ],
        },
      ],
    });
    return pedidos;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function modificarCompras(datos) {
  try {
    console.log(datos);
    const {
      nombre,
      idNombre,
      observaciones,
      fechaVencimiento,
      lote,
      precioCompra,
      idProveedor,
      estado,
    } = datos;
    const cat = await Compras.update(
      {
        nombre,
        idNombre,
        observaciones,
        fechaVencimiento,
        lote,
        precioCompra,
        idProveedor,
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

export { crearVentas, mostrarVentas, eliminarCompras, modificarCompras };
