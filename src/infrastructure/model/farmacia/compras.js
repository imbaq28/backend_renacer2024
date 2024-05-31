import { pk, setTimestamps } from "../../lib/util.js";
import moment from "moment";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    idNombre: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_nombre",
    },
    cantidad: {
      type: DataTypes.INTEGER,
      field: "cantidad",
    },
    observaciones: {
      type: DataTypes.STRING(500),
      field: "observaciones",
    },
    fechaVencimiento: {
      type: DataTypes.DATEONLY,
      field: "fecha_vencimiento",
      get() {
        const rawValue = this.getDataValue("fechaVencimiento");
        return rawValue ? moment(rawValue).format("DD/MM/YYYY") : null;
      },
      set(value) {
        if (value) {
          this.setDataValue(
            "fechaVencimiento",
            moment(value, "DD/MM/YYYY").format("YYYY-MM-DD")
          );
        }
      },
    },
    lote: {
      type: DataTypes.STRING(300),
      field: "lote",
    },
    precioCompra: {
      type: DataTypes.FLOAT,
      field: "precio_compra",
    },
    idProveedor: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_proveedor",
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

  const Compras = sequelize.define("compras", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "farmacia_compras",
  });

  return Compras;
};

export default model;
