//import { config } from "../../common/index.js";
import db from "../../common/config/db.js";

const configSeeder = {
  development: {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: "postgres",
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
    },
  },
  test: {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: "postgres",
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
    },
  },
  production: {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_seeders",
    dialect: "postgres",
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
    },
  },
};

export default configSeeder;
