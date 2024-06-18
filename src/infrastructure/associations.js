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
    compras,
  } = models;

  usuario.belongsTo(rol, { foreignKey: { name: "idRol" }, as: "roles" });
  rol.hasMany(usuario, { foreignKey: { name: "idRol" }, as: "usuario" });

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

  pedidos.belongsToMany(producto, {
    through: { model: pedidoProducto, unique: false },
    as: "productos",
    foreignKey: "idPedido",
  });
  producto.belongsToMany(pedidos, {
    through: { model: pedidoProducto, unique: false },
    as: "pedidos",
    foreignKey: "idProducto",
  });

  presentacion.hasMany(nombreProducto, {
    foreignKey: { name: "idPresentacion" },
    as: "nombres",
  });
  nombreProducto.belongsTo(presentacion, {
    foreignKey: { name: "idPresentacion" },
    as: "presentacion",
  });

  categoria.hasMany(nombreProducto, {
    foreignKey: { name: "idCategoria" },
    as: "categorias",
  });
  nombreProducto.belongsTo(categoria, {
    foreignKey: { name: "idCategoria" },
    as: "categoria",
  });

  proveedor.hasMany(compras, {
    foreignKey: { name: "idProveedor" },
    as: "compras",
  });
  compras.belongsTo(proveedor, {
    foreignKey: { name: "idProveedor" },
    as: "proveedor",
  });

  compras.belongsTo(nombreProducto, {
    foreignKey: { name: "idNombre" },
    as: "nombreProducto",
  });
  nombreProducto.hasMany(compras, {
    foreignKey: { name: "idNombre" },
    as: "compras",
  });

  producto.belongsTo(nombreProducto, {
    foreignKey: { name: "idNombre" },
    as: "nombreProducto",
  });
  nombreProducto.hasMany(producto, {
    foreignKey: { name: "idNombre" },
    as: "productos",
  });

  producto.hasMany(compras, {
    foreignKey: "idNombre",
    sourceKey: "idNombre",
    as: "detalles",
  });

  return models;
};

export default associations;
