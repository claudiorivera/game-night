const pgp = require("pg-promise")();

const connection = process.env.PG_URI;
const db = pgp(connection);

module.exports = db;
