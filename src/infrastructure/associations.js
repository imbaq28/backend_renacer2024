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

  categoria.belongsTo(producto, {
    foreignKey: { name: "idCategoria" },
    as: "producto",
  });
  producto.hasMany(categoria, {
    foreignKey: { name: "idCategoria" },
    as: "categorias",
  });

  presentacion.belongsTo(producto, {
    foreignKey: { name: "idPresentacion" },
    as: "producto",
  });
  producto.hasMany(presentacion, {
    foreignKey: { name: "idPresentacion" },
    as: "presentaciones",
  });

  proveedor.belongsTo(producto, {
    foreignKey: { name: "idProveedor" },
    as: "producto",
  });
  producto.hasMany(proveedor, {
    foreignKey: { name: "idProveedor" },
    as: "proveedores",
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
