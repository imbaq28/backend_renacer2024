// 'use strict';
import bcrypt from 'bcrypt'
import auth from '../../common/config/auth.js'
import {setTimestampsSeeder} from '../lib/util.js'

// const { setTimestampsSeeder } = require('../lib/util');
// const { Ids } = require('../../common/config/constants');

let items = [
    {
      id: 'cd2bd881-1133-4ace-8d11-9874b82c0a69',
      tipo_documento: 'CI',
      numero_documento: '4859740',
      fecha_nacimiento: '1987-11-16',
      usuario: '4859740',
      contrasena: bcrypt.hashSync('123456',auth.saltRounds),
      nombres: 'Billy Oscar',
      primer_apellido: 'Mendieta',
      segundo_apellido: 'Cabrera',
      celular: '74089941',
      id_rol: 'b22ae256-5f2e-49c6-a26c-ca19bb8443b5',
      correo_electronico: 'test@test.com',
    }
  ];
  
  items = setTimestampsSeeder(items);

  console.log('TESSSSSSSSSSSSSSSSSST user seeder');
  // Asignando datos de log y timestamps a los datos
  // items = setTimestampsSeeder(items);
  
  export const up = (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('sys_usuario', items, {})
        .then(async () => {})
        .catch(error => {
          if (error.message.indexOf('already exists') > -1) return;
          console.error(error);
          // logger.error(error)
        });
    };
  
  export const down = (queryInterface, Sequelize) => { };