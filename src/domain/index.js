import db from "../infrastructure/index.js";
import dba from "../common/config/db.js";
import { handleError, handleFatalError } from "../common/lib/errors.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initDomain() {
  const repositories = await db(dba).catch(handleError);

  // const helpers = await loadHelpers(path.join(__dirname, "helpers"));
  // const services = loadServices(
  //   path.join(__dirname, "services"),
  //   repositories,
  //   { exclude: ["index.js", "Service.js"], excludeRegex: [/[~|#]$/, /^(.#)/] },
  //   {},
  //   helpers
  // );

  // services._models = repositories._models;
  // services._repositories = repositories;

  // return services;
}

export default initDomain;
