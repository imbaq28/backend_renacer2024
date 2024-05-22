import { deleteItem } from "../Repository.js";

function usuarioRepository(models, Sequelize) {
  const { usuario } = models;

  return {
    deleteItem: (id, t) => deleteItem(id, usuario, t),
  };
}

export default usuarioRepository;
