const pgp = require("pg-promise")();

const db = pgp(process.env.PG_URI);

module.exports = db;
