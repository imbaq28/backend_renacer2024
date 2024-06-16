import express from "express";
import FarmaciaRoute from "./farmacia/index.js";
import SystemRoute from "./system/index.js";

const router = express.Router();

router.use("/system", SystemRoute);
router.use("/farmacia", FarmaciaRoute);

export default router;

// import { loadRoutes } from "../../lib/util.js";
// import chalk from "chalk";
// import { dirname } from "path";

// const api = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// async function setupApi(controllers, middlewares) {
//   const files = await fs.readdir(__dirname);

//   for (const file of files) {
//     const pathFile = path.join(__dirname, file);
//     const stats = await fs.stat(pathFile);

//     if (stats.isDirectory()) {
//       if (file !== "public") {
//         // Agregando Autenticación excepto a las rutas de la carpeta public
//         // api.use(`/${file}/*`, auth(config.auth));
//       }
//       const router = express.Router();
//       const doc = await loadRoutes(
//         pathFile,
//         null,
//         controllers,
//         middlewares,
//         router
//       );
//       console.log("controllers", `/${file}`, router);
//       api.use(`/${file}`, router);
//       console.log(
//         "🚀  " + chalk.yellow("RUTAS: ") + chalk.redBright(file.toUpperCase())
//       );
//       for (const i in doc) {
//         doc[i].url = `/api/${file}${doc[i].url}`;
//         console.log(" -", doc[i]);
//       }
//     }
//   }
//   return api;
// }

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const archivos = {};

// const files = fs.readdirSync(__dirname);
// files.forEach(async function (file) {
//   const pathFile = path.join(__dirname, file);
//   if (fs.statSync(pathFile).isDirectory()) {
//     const folderName = file; // Nombre de la carpeta

//     const folderFiles = fs.readdirSync(pathFile);

//     for (const folderFile of folderFiles) {
//       const filePath = path.join(pathFile, folderFile);
//       const routeName = `${folderName}/`; // Nombre de la carpeta seguido del nombre del archivo

//       const fileURL = pathToFileURL(filePath).toString();
//       const modulo = await import(fileURL);
//       archivos[routeName] = modulo.default;

//       router.use(`/${routeName}`, archivos[routeName]);
//     }
//   }
// });

// export default router;
