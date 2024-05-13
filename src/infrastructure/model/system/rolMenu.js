import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    idRol: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_rol",
    },
    idMenu: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_menu",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const RolMenu = sequelize.define("rol_menu", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "sys_rol_menu",
  });

  return RolMenu;
};

export default model;
