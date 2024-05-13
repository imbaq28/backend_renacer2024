import { pk, setTimestamps } from "../../lib/util.js";

const model = (sequelize, DataTypes) => {
  let fields = {
    id: pk,
    tipoDocumento: {
      type: DataTypes.STRING(15),
      field: "tipo_documento",
    },
    numeroDocumento: {
      type: DataTypes.STRING(15),
      field: "numero_documento",
    },
    complemento: {
      type: DataTypes.STRING(3),
      defaultValue: null,
      field: "complemento",
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      field: "fecha_nacimiento",
    },
    usuario: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nombres",
    },
    primerApellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "primer_apellido",
    },
    segundoApellido: {
      type: DataTypes.STRING(100),
      field: "segundo_apellido",
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "telefono",
    },
    celular: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "celular",
    },
    correoElectronico: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "correo_electronico",
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["ACTIVO", "INACTIVO"],
      defaultValue: "ACTIVO",
      allowNull: false,
      field: "estado",
    },
  };

  // Agregando campos para el log
  fields = setTimestamps(fields);

  const User = sequelize.define("usuario", fields, {
    paranoid: true,
    timestamps: true,
    tableName: "sys_usuario",
  });

  return User;
};

export default model;
