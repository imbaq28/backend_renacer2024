const db = {
  database: process.env.DB_NAME || "demo",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "root",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  timezone: "America/La_Paz",
};

export default db;
