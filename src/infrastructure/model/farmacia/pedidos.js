import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    idCliente: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_cliente",
    },
    fechaPedido: {
      type: DataTypes.DATEONLY,
      field: "fecha_pedido",
    },
    numeroFactura: {
      type: DataTypes.STRING(300),
      field: "numero_factura",
    },
    total: {
      type: DataTypes.FLOAT,
      field: "total",
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["ACTIVO", "INACTIVO"],
      field: "estado",
      defaultValue: "ACTIVO",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const Pedidos = sequelize.define("pedidos", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "farmacia_pedidos",
  });

  return Pedidos;
};

export default model;
