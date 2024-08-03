require('dotenv').config();

const config =  {
  DB_DATABASE: process.env.DB_DATABASE || "nextia-techtest",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DIALECT: process.env.DB_DIALECT || "mysql2",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 3306,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  SECRET_KEY: process.env.SECRET_KEY || "secret",
  EXPIRE_IN: process.env.EXPIRE_IN || "1h",
  EMAIL_HOST: process.env.EMAIL_HOST || "live.smtp.mailtrap.io",
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",
  EMAIL_USER_ADDRESS: "mailtrap@irvin-lopez.com"
}

module.exports = config;