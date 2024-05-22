import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./api/routes/index.js";
import "dotenv/config";
import App from "./index.js";
import api from "./api/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(fileUpload());

app.use("/api", routes);

app.use(express.static("public"));

(async function (app) {
  let services = {};

  const application = await App();

  services = Object.assign(services, application.services);
  app = await api(app, services);

  app.listen(PORT, () => {
    console.log(`Iniciando en el puerto ${PORT}`);
  });
})(app);
