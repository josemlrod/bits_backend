// NPM MODULES
const db = require('./database');

// GLOBAL VARIABLE 
FollowServices = {};

FollowServices.readFollowers = followed_user_id => db.any(
    `SELECT 
        *
    FROM follow JOIN users
    ON users.id = follow.follower_user_id
    WHERE follow.followed_user_id = $[followed_user_id]`, {followed_user_id,}
);

FollowServices.readFollowing = follower_user_id => db.any(
    `
    SELECT 
        *
    FROM follow JOIN users
    ON users.id = follow.followed_user_id
    WHERE follow.follower_user_id = $[follower_user_id]
    `, {follower_user_id,}
)

FollowServices.postFollow = (follower_user_id, followed_user_id) => db.none(
    `INSERT INTO 
        follow (follower_user_id, followed_user_id)
    VALUES
        ($[follower_user_id], $[followed_user_id])`, {follower_user_id, followed_user_id}
);

FollowServices.deleteFollow = (follower_user_id, followed_user_id) => db.none(
    `DELETE FROM
        follow
    WHERE
        follower_user_id = $[follower_user_id] AND followed_user_id = $[followed_user_id]`, {follower_user_id, followed_user_id}
);

module.exports = FollowServices;