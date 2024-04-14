class ErrorApp extends Error {
  constructor(
    errorMessage,
    httpCode = 400,
    name = "ErrorAplicacion",
    log = false,
    errorCode = 1
  ) {
    super(errorMessage);
    this.name = name;
    this.message = errorMessage || "Ha ocurrido un error";
    this.codigoError = errorCode || 0;
    this.httpCode = httpCode;
    this.stack = new Error(errorMessage).stack;
  }
}

export { ErrorApp };
