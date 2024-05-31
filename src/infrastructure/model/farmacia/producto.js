import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    idNombre: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_nombre",
    },
    precioVenta: {
      type: DataTypes.FLOAT,
      field: "precio_venta",
      defaultValue: 0,
    },
    precioUnitario: {
      type: DataTypes.FLOAT,
      field: "precio_unitario",
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      field: "stock",
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["ACTIVO", "INACTIVO"],
      defaultValue: "ACTIVO",
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
