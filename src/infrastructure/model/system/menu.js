import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    nombre: {
      type: DataTypes.STRING(50),
      field: "nombre",
    },
    ruta: {
      type: DataTypes.STRING(200),
    },
    icono: {
      type: DataTypes.TEXT,
      field: "icono",
    },
    orden: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "orden",
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["ACTIVO", "INACTIVO"],
      field: "estado",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const Menu = sequelize.define("menu", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "sys_menu",
  });

  return Menu;
};

export default model;
