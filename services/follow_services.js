// NPM MODULES
const db = require('./database');

// GLOBAL VARIABLE 
FollowServices = {};

FollowServices.readFollowers = (follower_user_id, followed_user_id) => db.any(
    `SELECT 
        users.username, users.avatar
    FROM users JOIN follow
    ON 
        follow.followed_user_id = $[followed_user_id]
    WHERE
        users.id = $[follower_user_id]`, {follower_user_id, followed_user_id}
);

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