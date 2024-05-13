import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    categoriaId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "categoria_id",
    },
    descripcion: {
      type: DataTypes.STRING(300),
      field: "descripcion",
    },
    fechaVencimiento: {
      type: DataTypes.DATEONLY,
      field: "fecha_vencimiento",
    },
    imagen: {
      type: DataTypes.STRING(300),
      field: "imagen",
    },
    nombre: {
      type: DataTypes.STRING(100),
      field: "nombre",
    },
    lote: {
      type: DataTypes.STRING(300),
      field: "lote",
    },
    nombreComercial: {
      type: DataTypes.STRING(300),
      field: "nombre_comercial",
    },
    precioCompra: {
      type: DataTypes.FLOAT,
      field: "precio_venta",
    },
    presentacionId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "presentacion_id",
    },
    proveedorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "proveedor_id",
    },
    precioVenta: {
      type: DataTypes.FLOAT,
      field: "precio_venta",
    },
    precioUnitario: {
      type: DataTypes.FLOAT,
      field: "precio_unitario",
    },
    stock: {
      type: DataTypes.INTEGER,
      field: "stock",
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["ACTIVO", "INACTIVO"],
      field: "estado",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const Producto = sequelize.define("producto", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "farmacia_producto",
  });

  return Producto;
};

export default model;
