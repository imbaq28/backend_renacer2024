import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

async function loadControllers(PATH, services, response, opts = {}) {
  const files = await fs.readdir(PATH);
  let controllers = {};

  if (opts.exclude) {
    // para excluir tambien expresiones regulares
    const excluir = [];
    opts.exclude.map((re) => {
      const regExp = new RegExp(re);
      files.map((file) => {
        if (regExp.test(file)) {
          excluir.push(file);
        }
      });
    });
    removeAll(excluir, files);
  }

  for (const file of files) {
    const pathFile = path.join(PATH, file);
    const stats = await fs.stat(pathFile);

    if (stats.isDirectory()) {
      controllers = Object.assign(
        controllers,
        loadControllers(pathFile, services, opts)
      );
    } else {
      const modelName = file.replace(".js", "");
      const moduleUrl = pathToFileURL(pathFile).href;
      const module = await import(moduleUrl);
      module.default(services, response);
      controllers[modelName] = module;
    }
  }

  return controllers;
}

async function loadMiddlewares(PATH, services) {
  const files = await fs.readdir(PATH);
  let middlewares = {};

  for (const file of files) {
    const pathFile = path.join(PATH, file);
    const stats = await fs.stat(pathFile);

    if (stats.isDirectory()) {
      middlewares = Object.assign(
        middlewares,
        loadMiddlewares(pathFile, services)
      );
    } else {
      const modelName = file.replace(".js", "");
      controllers[modelName] = await import(pathToFileURL(pathFile))(
        services,
        response
      );
    }
  }

  return middlewares;
}

/**
 *
 * @param {array} elements: Array de elementos a eliminar de 'list'
 * @param {array} list: Array de elementos
 */
function removeAll(elements, list) {
  var ind;

  for (var i = 0, l = elements.length; i < l; i++) {
    while ((ind = list.indexOf(elements[i])) > -1) {
      list.splice(ind, 1);
    }
  }
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function mergeDeepAll(array) {
  let obj = {};
  for (const i in array) {
    obj = mergeDeep(obj, array[i]);
  }
  return obj;
}

async function loadRoutes(PATH, opts = {}, services, middlewares, routes) {
  const files = await fs.readdir(PATH);
  let doc = [];

  if (opts && opts.exclude) {
    removeAll(opts.exclude, files);
  }

  for (const file of files) {
    const pathFile = path.join(PATH, file);
    const stats = await fs.stat(pathFile);

    if (stats.isDirectory()) {
      doc = doc.concat(loadRoutes(pathFile, opts, services, routes));
    } else {
      const modelName = file.replace(".js", "");
      const moduleUrl = pathToFileURL(pathFile).href;
      const module = await import(moduleUrl);
      module.default(routes, services, middlewares);
      routes[modelName] = module;
      console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRR", routes);
      doc = doc.concat(await getRoutesApi(pathFile));
    }
  }

  return doc;
}

async function getRoutesApi(pathFile) {
  const contenido = await fs.readFile(pathFile, "utf8");
  let content = contenido.split("\n").map((linea) => linea.trim());

  content = content.filter((text) => text.indexOf("api.") === 0);
  const routes = [];
  content.map((text) => {
    text = text.substring(4);
    let pos = text.indexOf("(");
    const method = text.substring(0, pos).toUpperCase();
    text = text.substring(pos + 2);
    pos = text.indexOf("'");
    if (pos === -1) {
      pos = text.indexOf('"');
    }
    const url = text.substring(0, pos);
    routes.push({
      method,
      url,
    });
  });

  return routes;
}

// function bufferToStream (buffer) {
//   const stream = new Duplex();
//   stream.push(buffer);
//   stream.push(null);
//   return stream;
// }

function createObject(headers, data) {
  const newObject = {};
  for (const i in headers) {
    newObject[headers[i].toLowerCase()] = data[headers[i]] || "";
  }
  return newObject;
}

export {
  mergeDeepAll,
  loadRoutes,
  // bufferToStream,
  createObject,
  loadControllers,
  loadMiddlewares,
};
