// LOCAL MODULE
const db = require('./database');

// GLOBAL VARIABLE
const LikeServices = {};

// OBJECT METHODS
LikeServices.postLike = (like_author, post_liked) => db.none(
    `INSERT INTO
        likes (like_author, post_liked)
    VALUES
        ($[like_author], $[post_liked])`, {like_author, post_liked,}
);

LikeServices.deleteLike = post_liked => db.none(
    `DELETE FROM
        likes
    WHERE
        post_liked = $[post_liked]`, {post_liked,}
);

module.exports = LikeServices;