import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["ACTIVO", "INACTIVO"],
      allowNull: false,
      defaultValue: "ACTIVO",
      field: "estado",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const Rol = sequelize.define("rol", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "sys_rol",
  });

  return Rol;
};

export default model;
