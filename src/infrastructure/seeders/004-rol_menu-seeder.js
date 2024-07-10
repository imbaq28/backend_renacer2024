import {setTimestampsSeeder} from '../lib/util.js'
import { v4 as uuidv4 } from 'uuid';

let items = [
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: '03e1fa82-bcbe-4fbe-8f73-367e402bd53a'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: 'f1d248a8-d78b-437d-bca5-bd41c61094c4'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: 'a1c03272-5f55-4fcc-9ca2-edcb45546cc4'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: '51d606ba-d4f1-4aaa-8c2b-a4cde0256c06'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: 'fb7c35aa-d0d4-4171-9af4-1564e2ade063'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: '3bde8bf2-d599-4470-81e9-69c30c317d99'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: 'c655f39b-b444-4c86-be27-b7b40c9ea136'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: '77eef41d-f08b-43c2-93c3-1d8b860b6f2c'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: 'ea81f16e-718b-4660-a5ea-cafa4f182331'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: 'cbfce909-da1b-446c-9b10-22d6844439d6'
  },
  {
    id: uuidv4(),
    id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
    id_menu: '65432ee2-bcca-4f6d-9174-ba7672e1c4a2'
  },
];

items = setTimestampsSeeder(items);
// Asignando datos de log y timestamps a los datos
// items = setTimestampsSeeder(items);

export const up = (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sys_rol_menu', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
        // logger.error(error)
      });
  };

export const down = (queryInterface, Sequelize) => { };