const associations = (models) => {
  const { usuario, rol, menu, rolMenu, categoria, producto, proveedor } =
    models;

  rol.belongsTo(usuario, { foreignKey: { name: "idRol" }, as: "usuario" });
  usuario.hasMany(rol, { foreignKey: { name: "idRol" }, as: "roles" });

  rol.belongsToMany(menu, {
    through: { model: rolMenu, unique: false },
    as: "menus",
    foreignKey: "idRol",
  });
  menu.belongsToMany(rol, {
    through: { model: rolMenu, unique: false },
    as: "roles",
    foreignKey: "idMenu",
  });

  return models;
};

export default associations;
