// NPM MODULE
const PublicUserRouter = require('express').Router();

// LOCAL MODULE
const UserServices = require('../services/user_services');
const {isRequiredNeeded} = require('../services/utils');

// EXPRESS ROUTE CALLBACKS
PublicUserRouter.post('/', (request, response) => {
    if (isRequiredNeeded(request.body)) {
        response.status(400);
        response.json({
            'err': `Some values are missing.`,
        });
    } else {
        const {username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url} = request.body;
        UserServices.createUser(username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully created user.`
                });
            })
            .catch(err => {
                response.status(400);
                response.json({
                    'err': `Something went wrong.`
                });
                console.log(err);
            });
    }
})

PublicUserRouter.get('/:username', (request, response) => {
    const {username,} = request.params;
    UserServices.readUser(username)
        .then(user => {
            response.status(200);
            response.json(user);
        })
        .catch(err => {
            response.status(404);
            response.json({
                'err': 'Error 404. Not Found.',
            });
        });
})

module.exports = PublicUserRouter;