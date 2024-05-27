const associations = (models) => {
  const {
    usuario,
    rol,
    menu,
    rolMenu,
    categoria,
    producto,
    proveedor,
    presentacion,
    pedidos,
    pedidoProducto,
    nombreProducto,
  } = models;

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

  categoria.hasMany(producto, {
    foreignKey: { name: "idCategoria" },
    as: "productos",
  });
  producto.belongsTo(categoria, {
    foreignKey: { name: "idCategoria" },
    as: "categoria",
  });

  presentacion.hasMany(producto, {
    foreignKey: { name: "idPresentacion" },
    as: "productos",
  });
  producto.belongsTo(presentacion, {
    foreignKey: { name: "idPresentacion" },
    as: "presentacion",
  });

  proveedor.hasMany(producto, {
    foreignKey: { name: "idProveedor" },
    as: "productos",
  });
  producto.belongsTo(proveedor, {
    foreignKey: { name: "idProveedor" },
    as: "proveedor",
  });
  producto.belongsTo(nombreProducto, {
    foreignKey: { name: "idNombre" },
    as: "nombreProducto",
  });

  pedidos.belongsToMany(producto, {
    through: { model: pedidoProducto, unique: false },
    as: "pedidos",
    foreignKey: "idPedido",
  });
  producto.belongsToMany(pedidos, {
    through: { model: pedidoProducto, unique: false },
    as: "productos",
    foreignKey: "idProducto",
  });

  return models;
};

export default associations;
