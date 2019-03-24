// NPM MODULES
const PrivateFollowRouter = require('express').Router();

// LOCAL MODULES
const FollowServices = require('../services/follow_services');
const checkFirebaseToken = require('../services/firebase_auth');

// PrivateFollowRouter.use(checkFirebaseToken);

// EXPRESS ROUTES CALLBACKS
PrivateFollowRouter.get('/:followed_user_id', (request, response) => {
    const {followed_user_id,} = request.params;
    if (isNaN(parseInt(followed_user_id))) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        FollowServices.readFollowers(followed_user_id)
            .then(data => {
                response.status(200);
                response.json({
                    'msg': `Success.`,
                    'data': data,
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

PrivateFollowRouter.delete('/:follower_user_id/:followed_user_id', (request, response) => {
    const {follower_user_id, followed_user_id} = request.params;
    if (!follower_user_id || !followed_user_id || 
            isNaN(parseInt(follower_user_id)) || isNaN(parseInt(followed_user_id))) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        FollowServices.deleteFollow(follower_user_id, followed_user_id)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully deleted follow.`,
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