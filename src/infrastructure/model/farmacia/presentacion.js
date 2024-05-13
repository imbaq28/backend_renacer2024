import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    nombre: {
      type: DataTypes.STRING(50),
      field: "nombre",
    },
    detalle: {
      type: DataTypes.STRING(300),
      field: "detalle",
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["ACTIVO", "INACTIVO"],
      field: "estado",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const Presentacion = sequelize.define("presentacion", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "farmacia_presentacion",
  });

  return Presentacion;
};

export default model;
