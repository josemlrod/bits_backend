// NPM MODULES
const pgp = require('pg-promise')({});

// DB CONNECTION
const db = pgp('postgres://localhost/bits');

module.exports = db;