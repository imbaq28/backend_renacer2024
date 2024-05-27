const db = {
  database: process.env.DB_NAME || "renacerDB",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "oeoeoe",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  timezone: "America/La_Paz",
};

export default db;
