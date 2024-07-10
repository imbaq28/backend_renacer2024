import { Sequelize } from 'sequelize';
import { up as rolSeederUpUno } from './001-rol-seeder.js';
import { up as rolSeederUpDos } from './002-user-seeder.js';
import { up as rolSeederUpTres } from './003-menu-seeder.js';
import { up as rolSeederUpCuatro } from './004-rol_menu-seeder.js';
// import "dotenv/config";
import config from '../lib/config-seeders.js';


// Crear una instancia de Sequelize usando la configuración
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
// });
const sequelize = new Sequelize(config)

// Ejecutar el seeder
async function runSeeder() {
  const queryInterface = sequelize.getQueryInterface();
  await rolSeederUpUno(queryInterface, Sequelize);
  await rolSeederUpDos(queryInterface, Sequelize);
  await rolSeederUpTres(queryInterface, Sequelize);
  await rolSeederUpCuatro(queryInterface, Sequelize);
  console.log('Seeders ejecutados correctamente');
  await sequelize.close();
}

runSeeder().catch(error => {
  console.error('Error al ejecutar los seeders:', error);
});