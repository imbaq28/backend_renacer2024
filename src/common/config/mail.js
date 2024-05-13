const correoConfig = {
  origen: process.env.EMAIL_SENDER || "email@mail.com",
  host: process.env.EMAIL_HOST || "smtp.email.com", // localhost en el test o prod
  port: process.env.EMAIL_PORT || 587, // 25 en el test o prod
  secure: false,
  ignoreTLS: false,
  auth: {
    user: "<unusuario@email.com>", // Obligatorio para desarrollo
    pass: "<password>", // Obligatorio para desarrollo
  },
  tls: {
    rejectUnauthorized: false,
  },
};
export default correoConfig;
