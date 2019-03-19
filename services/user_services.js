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

UserServices.updateUser = (username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url, user_id) => db.none(
    `
    UPDATE users SET
        username = $[username], firebase_uid = $[firebase_uid], avatar = $[avatar], first_name = $[first_name], 
        last_name = $[last_name], email = $[email], bio = $[bio], foods = $[foods], music = $[music], movies = $[movies], 
        rel_status = $[rel_status], website_url = $[website_url]
    WHERE
        users.id = $[user_id]`,
    {username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url, user_id}
)

UserServices.deleteUser = (user_id) => db.none(
    'DELETE FROM posts WHERE post_author=${user_id}; DELETE FROM comments WHERE comment_author=${user_id}; DELETE FROM users WHERE id=${user_id};', {user_id,}
);

module.exports = UserServices;