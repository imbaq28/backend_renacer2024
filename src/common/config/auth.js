const auth = {
  secret: process.env.SECRET || "BASE",
  algorithms: ["HS256"],
  saltRounds: 10,
};

export default auth;
