// NPM MODULES
const PrivateUserRouter = require('express').Router();

// LOCAL MODULES
const UserServices = require('../services/user_services');
const {isRequiredNeeded, isUserID} = require('../services/utils');

// EXPRESS ROUTE CALLBACKS
PrivateUserRouter.get('/', (request, response) => {
    UserServices.getAllUsers()
        .then(data => {
            response.status(200);
            response.json({
                'msg': `Succesfully retrieved user info`,
                data,
            });
        })
        .catch(err => {
            response.status(400);
            response.json({
                'msg': `err. Something went wrong`,
            });
        });
})

PrivateUserRouter.put('/:user_id', (request, response) => {
    const {user_id} = request.params;
    if (isRequiredNeeded(request.body) || !user_id || typeof parseInt(user_id) !== 'number') {
        response.status(400);
        response.json({
            'msg': `err. Some values are missing.`,
        });
    }
    else {
        const {username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url} = request.body;
        UserServices.updateUser(username, firebase_uid, avatar, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url, user_id)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully updated user.`,
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

PrivateUserRouter.delete('/:user_id', (request, response) => {
    const {user_id} = request.params;
    if (isUserID(user_id) || !request.params) {
        response.status(400);
        response.json({
            'msg': `err. Please input correct user_id.`,
        });
    } else {
        UserServices.deleteUser(user_id)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully deleted user.`,
                });
            })
            .catch(err => {
                response.status(400);
                response.json({
                    'msg': `err. Something went wrong.`,
                });
            });
    }
})

module.exports = PrivateUserRouter;