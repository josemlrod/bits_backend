const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/bits');

module.exports = db;