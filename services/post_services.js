// LOCAL MODULE
const db = require('./database');

// GLOBAL VARIABLE
const PostServices = {};

PostServices.createPost = (post_author, post_img, post_text) => db.none(
    `INSERT INTO
        posts (post_author, post_img, post_text)
    VALUES
        ($[post_author], $[post_img], $[post_text])`,
    {post_author, post_img, post_text,}
);

PostServices.readPost = post_id => db.one(
    `SELECT * FROM posts WHERE id = $[post_id]`, {post_id,}
);

PostServices.updatePost = (post_id, post_img, post_text) => db.none(
    `UPDATE posts SET
        post_img = $[post_img], post_text = $[post_img]
    WHERE
        id = $[post_id]`, {post_id, post_img, post_text,}
);

PostServices.deletePost = post_id => {
    'DELETE FROM comments WHERE post_id=${post_id}; DELETE FROM posts WHERE id=${post_id};', {post_id,}
}

module.exports = PostServices;