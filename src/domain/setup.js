import db from "../common/config/db.js";
import { handleFatalError } from "../common/lib/errors.js";

async function setup() {
  await domain(db).catch(handleFatalError);

  console.log("Success Domain setup!");
  process.exit(0);
}

setup();
