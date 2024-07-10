import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = {
  rootPath: path.resolve(__dirname, "../../../"),
};

export default app;
