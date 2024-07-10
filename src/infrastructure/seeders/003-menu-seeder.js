import {setTimestampsSeeder} from '../lib/util.js'

let items = [
  {
    id: '03e1fa82-bcbe-4fbe-8f73-367e402bd53a',
    nombre: 'USUARIOS',
    ruta: '/farmacia/usuario',
    icono: 'inbox',
    orden: '1',
  },
  {
    id: 'f1d248a8-d78b-437d-bca5-bd41c61094c4',
    nombre: 'CLIENTES',
    ruta: '/farmacia/cliente',
    icono: 'inbox',
    orden: '2',
  },
  {
    id: 'a1c03272-5f55-4fcc-9ca2-edcb45546cc4',
    nombre: 'STOCKS Y PRECIO DE VENTA',
    ruta: '/farmacia/medicamento',
    icono: 'today',
    orden: '3',
  },
  {
    id: '51d606ba-d4f1-4aaa-8c2b-a4cde0256c06',
    nombre: 'PROVEEDORES',
    ruta: '/farmacia/proveedores',
    icono: 'inbox',
    orden: '4',
  },
  {
    id: 'fb7c35aa-d0d4-4171-9af4-1564e2ade063',
    nombre: 'CATEGORIAS',
    ruta: '/farmacia/categoria',
    icono: 'today',
    orden: '5',
  },
  {
    id: '3bde8bf2-d599-4470-81e9-69c30c317d99',
    nombre: 'PRESENTACION',
    ruta: '/farmacia/nombre',
    icono: 'inbox',
    orden: '6',
  },
  {
    id: 'c655f39b-b444-4c86-be27-b7b40c9ea136',
    nombre: 'MEDICAMENTO',
    ruta: '/farmacia/compras',
    icono: 'inbox',
    orden: '7',
  },
  {
    id: '77eef41d-f08b-43c2-93c3-1d8b860b6f2c',
    nombre: 'ROLES',
    ruta: '/farmacia/roles',
    icono: 'today',
    orden: '8',
  },
  {
    id: 'ea81f16e-718b-4660-a5ea-cafa4f182331',
    nombre: 'MENUS',
    ruta: '/farmacia/menu',
    icono: 'inbox',
    orden: '9',
  },
  {
    id: 'cbfce909-da1b-446c-9b10-22d6844439d6',
    nombre: 'VENTAS',
    ruta: '/farmacia/ventas2',
    icono: 'today',
    orden: '10',
  },
  {
    id: '65432ee2-bcca-4f6d-9174-ba7672e1c4a2',
    nombre: 'REPORTES',
    ruta: '/farmacia/reportes',
    icono: 'inbox',
    orden: '11',
  },
];

items = setTimestampsSeeder(items);
// Asignando datos de log y timestamps a los datos
// items = setTimestampsSeeder(items);

export const up = (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sys_menu', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
        // logger.error(error)
      });
  };

export const down = (queryInterface, Sequelize) => { };