import fs from "fs/promises";
import path from "path";
import Response from "./reponse.js";
import { removeAll } from "../../common/lib/array.js";
import { pathToFileURL } from "url";

let res;

async function loadHelpers(PATH) {
  const files = await fs.readdir(PATH);
  let helpers = {};

  for (const file of files) {
    const pathFile = path.join(PATH, file);
    const stats = await fs.stat(pathFile);

    if (stats.isDirectory()) {
      helpers = Object.assign(helpers, loadHelpers(pathFile));
    } else {
      file = file.replace(".js", "");
      const { default: modelModule } = await import(pathToFileURL(pathFile));

      helpers[file] = modelModule();
    }
  }

  return helpers;
}

async function loadServices(PATH, repositories, opts = {}, logs, helpers = {}) {
  if (!res) {
    res = Response(logs);
  }
  const files = await fs.readdir(PATH);
  let services = {};

  if (opts.exclude) {
    removeAll(opts.exclude, files);
  }

  // para excluir tambien expresiones regulares
  if (opts.excludeRegex) {
    const excluir = [];
    opts.excludeRegex.map((re) => {
      const regExp = new RegExp(re);
      files.map((file) => {
        if (regExp.test(file)) {
          excluir.push(file);
        }
      });
    });
    if (excluir.length > 0) {
      removeAll(excluir, files);
    }
  }

  for (const file of files) {
    const pathFile = path.join(PATH, file);
    const stats = await fs.stat(pathFile);

    if (stats.isDirectory()) {
      services = Object.assign(
        services,
        loadServices(pathFile, repositories, opts, logs, helpers)
      );
    } else {
      const modelName = file.replace(".js", "");
      const { default: modelModule } = await import(pathToFileURL(pathFile));

      services[modelName] = modelModule(repositories, helpers, res);
    }
  }

  return services;
}

function loadClasses(PATH, opts) {
  const files = fs.readdirSync(PATH);
  let classes = {};

  if (opts.exclude) {
    removeAll(opts.exclude, files);
  }

  // para excluir tambien expresiones regulares
  if (opts.excludeRegex) {
    const excluir = [];
    opts.excludeRegex.map((re) => {
      const regExp = new RegExp(re);
      files.map((file) => {
        if (regExp.test(file)) {
          excluir.push(file);
        }
      });
    });
    if (excluir.length > 0) {
      removeAll(excluir, files);
    }
  }

  files.forEach(function (file) {
    const pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      classes = Object.assign(classes, loadClasses(pathFile, opts));
    } else {
      file = file.replace(".js", "");
      classes[file] = require(pathFile);
    }
  });

  return classes;
}

function loadValidations(PATH, opts) {
  const files = fs.readdirSync(PATH);
  const valueObjects = {};

  if (opts.exclude) {
    removeAll(opts.exclude, files);
  }

  // para excluir tambien expresiones regulares
  if (opts.excludeRegex) {
    const excluir = [];
    opts.excludeRegex.map((re) => {
      const regExp = new RegExp(re);
      files.map((file) => {
        if (regExp.test(file)) {
          excluir.push(file);
        }
      });
    });
    if (excluir.length > 0) {
      removeAll(excluir, files);
    }
  }

  files.forEach(function (file) {
    const pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      valueObjects[file] = loadValidations(pathFile, opts);
    } else {
      file = file.replace(".js", "");
      valueObjects[file] = require(pathFile);
    }
  });

  return valueObjects;
}

export {
  loadHelpers,
  loadServices,
  // loadClasses,
  // loadValidations
};
