import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    nombre: {
      type: DataTypes.STRING(50),
      field: "nombre",
    },
    idPresentacion: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_presentacion",
    },
    idCategoria: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "id_categoria",
    },
    nombreQuimico: {
      type: DataTypes.STRING(300),
      field: "nombre_quimico",
    },
    descripcion: {
      type: DataTypes.STRING(500),
      field: "descripcion",
    },
    imagen: {
      type: DataTypes.STRING(300),
      field: "imagen",
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

  const Nombre = sequelize.define("nombre", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "farmacia_nombre",
  });

  return Nombre;
};

export default model;
