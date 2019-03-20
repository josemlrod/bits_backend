// LOCAL MODULE
const db = require('./database');

// GLOBAL VARIABLE
const CommentServices = {};

// OBJECT METHODS
CommentServices.createComment = (comment_author, post_id, comment_text) => db.none(
    `INSERT INTO 
        comments (comment_author, post_id, comment_text) 
    VALUES 
        ($[comment_author], $[post_id], $[comment_text])`, {comment_author, post_id, comment_text}
);

CommentServices.deleteComment = comment_id => db.none(
    `DELETE FROM 
        comments 
    WHERE 
    id = $[comment_id]`, {comment_id,}
);

module.exports = CommentServices;