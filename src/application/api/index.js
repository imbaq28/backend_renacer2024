import { loadControllers, loadMiddlewares } from "../lib/util.js";
import express from "express";
import path from "path";
import routes from "./routes/index.js";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupApi(app, services) {
  // const controllers = await loadControllers(
  //   path.join(__dirname, "controllers"),
  //   services
  // );

  // const middlewares = await loadMiddlewares(
  //   path.join(__dirname, "middlewares"),
  //   services
  // );

  // const { AuthMiddleware } = middlewares;

  // app.use('/api/*', AuthMiddleware.verificarToken());
  // const rou = routes();
  app.use("/api", routes);

  app.use(function (err, req, res, nxt) {
    if (err.code === "invalid_token") {
      res.status(403).send({
        finalizado: false,
        mensaje: "No autorizado",
        datos: null,
      });
    }
    if (err.code === "permission_denied") {
      res.status(403).send({
        finalizado: false,
        mensaje: "No tiene permisos para realizar esta accion",
        datos: null,
      });
    }
  });
  // login Route
  console.log("🚀  " + chalk.yellow("RUTAS: ") + chalk.redBright("AUTH"));

  // app.post("/auth/login", controllers.AuthController.login);

  console.log("🚀  " + chalk.yellow("RUTAS: ") + chalk.redBright("AUTH"));

  // app.get("/autorizar", controllers.AuthController.autorizar);
  // app.get("/codigo", controllers.AuthController.codigo);
  // app.post("/logout", controllers.AuthController.logout);

  // app.post("/auth/login", controllers.AuthController.login);

  app.get("/public/status", (req, res, next) => {
    const date = new Date();
    return res.status(200).send({
      finalizado: true,
      mensaje: "Funcionando correctamente",
      datos: {
        code: Buffer.from(date.toString()).toString("base64"),
        anio: date.getFullYear(),
        mes: date.getMonth() + 1,
        dia: date.getDate(),
      },
    });
  });

  console.log(" -", { method: "GET", url: "/public/status" });
  console.log(" -", { method: "POST", url: "/auth/login" });
  console.log(" -", { method: "POST", url: "/auth/refresh-token" });

  return app;
}

export default setupApi;
