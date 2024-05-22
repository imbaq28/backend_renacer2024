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
      defaultValue: "ACTIVO",
      field: "estado",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const Categoria = sequelize.define("categoria", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "farmacia_categoria",
  });

  return Categoria;
};

export default model;
