import jwt from "jsonwebtoken";
import "dotenv/config";

function verify(token, secret, callback) {
  return jwt.verify(token, secret, callback);
}

const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

function mensajeError(res, code, mensaje, datos) {
  return res.status(code || HTTP_CODES.BAD_REQUEST).json({
    finalizado: false,
    mensaje: mensaje || "ERROR",
    datos: datos || null,
  });
}

async function verificarToken(req, res, next) {
  let data;
  let tokenRequest = null;
  const secret = process.env.SECRET;
  try {
    if (!req.headers.authorization) {
      throw new Error("No autorizado");
    }
    tokenRequest = req.headers.authorization.replace("Bearer ", "");
    data = await verify(tokenRequest, secret);
    req.user = data;
    next();
  } catch (error) {
    mensajeError(res, HTTP_CODES.UNAUTHORIZED, error.message);
  }
}

export { verificarToken };
