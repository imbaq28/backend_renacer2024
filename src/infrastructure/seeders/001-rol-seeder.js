import {setTimestampsSeeder} from '../lib/util.js'

let items = [
  {
    id: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    nombre: 'ADMINISTRADOR',
    descripcion: 'Rol administrador',
  },
  {
    id: 'cc08abb7-de02-4734-897b-b930904d5ca9',
    nombre: 'CLIENTE',
    descripcion: 'Rol cliente',
  }
];

items = setTimestampsSeeder(items);
// Asignando datos de log y timestamps a los datos
// items = setTimestampsSeeder(items);

export const up = (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sys_rol', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
        // logger.error(error)
      });
  };

export const down = (queryInterface, Sequelize) => { };