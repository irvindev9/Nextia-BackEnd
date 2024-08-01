const knex = require("knex");
const {
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  DB_HOST,
  DB_PORT
} = require("../../config");;

module.exports = knex({
  client: DB_DIALECT,
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
});