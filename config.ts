const config =  {
  DB_DATABASE: process.env.DB_DATABASE || "nextia-techtest",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DIALECT: process.env.DB_DIALECT || "mysql2",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 3306,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*"
}

module.exports = config;