import minimist from "minimist";
import inquirer from "inquirer";

// import { errors } from "../common/index.js";
import db from "../common/config/db.js";
import dbIndex from "./index.js";

const args = minimist(process.argv);
const prompt = inquirer.createPromptModule();

async function setup() {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: "confirm",
        name: "setup",
        message: `¿Realmente quiere destruir y crear de nuevo la base de datos "${db.database}" de la aplicación?`,
      },
    ]);

    if (!answer.setup) {
      return console.log("Nothing happened :)");
    }
  }

  const configDB = db;
  configDB.setup = true; // Forzamos que la base de datos se cree desde cero

  await dbIndex(configDB);

  configDB.force = true;

  console.log("Success Infrastructure setup!");
  process.exit(0);
}

setup();
