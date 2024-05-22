import defaults from "defaults";
import Sequelize from "sequelize";
import {
  loadModels,
  loadRepositories,
  convertLinealObject,
} from "./lib/util.js";
import transaction from "./lib/transaction.js";
import associations from "./associations.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function create(config) {
  config = defaults(config, {
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    timezone: "America/La_Paz",
  });
  const sequelize = new Sequelize(config);

  let _models = await loadModels(path.join(__dirname, "model"), sequelize, {
    exclude: ["index.js"],
    // para excluir archivos por expresión regular
    excludeRegex: [/[~|#]$/, /^(.#)/],
  });
  _models = convertLinealObject(_models);
  const models = associations(_models);

  let repositories = loadRepositories(
    path.join(__dirname, "repositories"),
    models,
    Sequelize,
    {
      exclude: ["index.js", "Repository.js"],
      // para excluir archivos por expresión regular
      excludeRegex: [/[~|#]$/, /^(.#)/],
    }
  );
  repositories = convertLinealObject(repositories);
  repositories.transaction = transaction(sequelize);

  // Cargando asociaciones entre las tablas

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true });
  }

  repositories._models = _models;

  // console.log(repositories);
  return repositories;
}

export default create;
