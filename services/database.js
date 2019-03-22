// NPM MODULES
const pgp = require('pg-promise')({});

// DB CONNECTION
const db = pgp(process.env.postgresql-clear-62882 || 'postgres://localhost/bits');

module.exports = db;