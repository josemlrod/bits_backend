// LOCAL MODULE
const db = require('./database');

// GLOBAL VARIABLE
const UserServices = {};

// DB FUNCTIONS
UserServices.createUser = (username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url) => db.none(
    `
    INSERT INTO
        users (username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url)
    VALUES
        ($[username], $[firebase_uid], $[avatar], $[first_name], $[last_name], $[email], $[bio], $[foods], $[music], $[movies], $[rel_status], $[website_url])`,
    {username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url}
);

UserServices.readUser = username => db.one(
    `
    SELECT * FROM users WHERE username = $[username]
    `, {username,}
);

module.exports = UserServices;