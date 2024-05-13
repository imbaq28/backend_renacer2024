import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    nombre: {
      type: DataTypes.STRING(100),
      field: "nombre",
    },
    direccion: {
      type: DataTypes.STRING(300),
      field: "direccion",
    },
    telefono: {
      type: DataTypes.STRING(300),
      field: "telefono",
    },
    nit: {
      type: DataTypes.STRING(300),
      field: "nit",
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["ACTIVO", "INACTIVO"],
      field: "estado",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const Proveedor = sequelize.define("proveedor", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "farmacia_proveedor",
  });

  return Proveedor;
};

export default model;
