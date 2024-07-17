import { ErrorApp } from "../../lib/error.js";
import moment from "moment";
import puppeteer from "puppeteer";
import init from "../../init.js";
import path from "path";
import fs from "fs";
import app from "../../../common/config/app.js";
import ejs from "ejs";

let Producto;
let Compras;
let Proveedor;
let Nombre;
let Presentacion;
let Categoria;
let Pedidos;
let PedidoProducto;
let Usuario;

const { models, transaction } = await init();
Producto = models.producto;
Compras = models.compras;
Proveedor = models.proveedor;
Nombre = models.nombreProducto;
Presentacion = models.presentacion;
Categoria = models.categoria;
Pedidos = models.pedidos;
PedidoProducto = models.pedidoProducto;
Usuario = models.usuario;

console.log("Roles", Producto);
// const { categoria: Categoria } = models;
// const { UsuarioRepository } = repositories;

async function fechaVencimientoService(data) {
  try {
    console.log("data", data);
    const maxDias = 90;

    // const compras = await Compras.findAll({ raw: true });
    const productos = await Producto.findAll({ raw: true });
    // console.log(compras);
    const arrayAlerta = [];
    for (const producto of productos) {
      let stockTotal = producto.stock;
      const compras = await Compras.findAll({
        where: { idNombre: producto.idNombre },
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
        order: [["createdAt", "ASC"]],
        // raw: true,
      });
      const comprasJSON = compras.map((c) => c.toJSON());
      for (const compra of comprasJSON) {
        if (stockTotal >= 0) {
          stockTotal = stockTotal - compra.cantidad;
          compra.stock = producto.stock;
          compra.cantidad =
            stockTotal >= 0 ? compra.cantidad : compra.cantidad + stockTotal;
          arrayAlerta.push(compra);
        }
      }

      // const diferenciaDias = moment(compra.fechaVencimiento, "YYYY-MM-DD").diff(
      //   moment(),
      //   "days"
      // );
      // console.log(diferenciaDias);
    }
    const arrayAlertaFecha = [];
    for (const dato of arrayAlerta) {
      const diferenciaDias = moment(dato.fechaVencimiento, "YYYY-MM-DD").diff(
        moment(),
        "days"
      );
      console.log(diferenciaDias, maxDias);
      if (diferenciaDias <= maxDias) {
        arrayAlertaFecha.push(dato);
      }
    }
    // console.log("arrayAlerta", arrayAlerta);
    // return RolesRepository.deleteItem(id);
    return arrayAlertaFecha;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function cantidadMinimaService(data) {
  try {
    const productos = await Producto.findAll({
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
      order: [["createdAt", "DESC"]],
    });
    const productosJSON = productos.map((p) => p.toJSON());
    let arrayAlertaMinima = [];
    for (const producto of productosJSON) {
      if (producto.stock <= producto.cantidadMinima) {
        arrayAlertaMinima.push(producto);
      }
    }
    return arrayAlertaMinima;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

async function convertPDF(
  html,
  path,
  margins = { top: "20mm", right: "20mm", botton: "20mm", left: "30mm" }
) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({
    path,
    format: "letter",
    margin: margins,
    // printBackground: true,
  });
  await browser.close();
}

async function generarFacturaService(id) {
  try {
    let respuesta;
    const pedidoAntes = await Pedidos.findOne({
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
      ],
      where: { id: id },
    });
    const pedido = pedidoAntes.toJSON();
    pedido.fechaPedido = moment(pedido.fechaPedido).format("DD-MM-YYYY");
    console.log(pedido.fechaPedido);
    if (!pedido) throw new Error("El pedido no existe");
    const pdfFolder = path.resolve(app.rootPath, "./pdf");
    fs.existsSync(pdfFolder) || fs.mkdirSync(pdfFolder);

    const outPath = path.resolve(pdfFolder, `${id}.pdf`);
    if (fs.existsSync(outPath)) {
      respuesta = fs.readFileSync(outPath, "base64");
      return respuesta;
    }

    const ubicacionImagen = path.resolve("public/image/ren.jpg");
    let imagen = fs.readFileSync(ubicacionImagen, "base64");

    const html = await ejs.renderFile(
      path.resolve(`${app.rootPath}/src/views/factura.ejs`),
      {
        titulo: "Factura",
        pedido,
        imagen,
      }
    );
    await convertPDF(html, outPath);

    respuesta = fs.readFileSync(outPath, "base64");
    return respuesta;
  } catch (error) {
    throw new ErrorApp(error.message, 400);
  }
}

export {
  fechaVencimientoService,
  cantidadMinimaService,
  generarFacturaService,
};
