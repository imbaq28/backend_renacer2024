import domain from "../domain/index.js";

async function setupModule() {
  try {
    // Cargando Capa del dominio
    const services = await domain();
    // console.log("test ", services);

    // Agregando Logs a los servicios
    // services.Log = await Logs(config.db);

    return {
      services,
      // _models: services._models,
      // _repositories: services._repositories,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Error al instanciar el módulo principal: ${err.message}`);
  }
}

export default setupModule;
