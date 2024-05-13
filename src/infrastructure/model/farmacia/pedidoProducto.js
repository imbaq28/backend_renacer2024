import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    idPedido: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_pedido",
    },
    idProducto: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_producto",
    },
    cantidad: {
      type: DataTypes.INTEGER,
      field: "cantidad",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const PedidoProducto = sequelize.define("pedidoProducto", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "farmacia_pedido_producto",
  });

  return PedidoProducto;
};

export default model;
