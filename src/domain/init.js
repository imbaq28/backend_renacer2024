import create from "../infrastructure/index.js";
import db from "../common/config/db.js";
let models;

async function init() {
  const config = {
    database: db.database,
    username: db.username,
    password: db.password,
    setup: false,
  };
  const { transaction, _models } = await create(db);
  models = _models;
  console.log("modelos init", models);
  return {
    models,
    transaction,
  };
}

export default init;
