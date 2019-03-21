// NPM MODULE
const PrivateFollowRouter = require('express').Router();

// LOCAL MODULE
const FollowServices = require('../services/follow_services');

PrivateFollowRouter.post('/', (request, response) => {
    const {follower_user_id, followed_user_id} = request.body;
    if (!follower_user_id || !followed_user_id) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        FollowServices.postFollow(follower_user_id, followed_user_id)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully posted follow.`,
                });
            })
            .catch(err => {
                response.status(400);
                response.json({
                    'msg': `err. Something went wrong.`,
                });
            });
    }
});


module.exports = PrivateFollowRouter;