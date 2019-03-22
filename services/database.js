// NPM MODULES
const pgp = require('pg-promise')({});

// DB CONNECTION
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost/bits');

module.exports = db;