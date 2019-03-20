// NPM MODULE
const PublicPostRouter = require('express').Router();

// LOCAL MODULES
const PostServices = require('../services/post_services');

// EXPRESS ROUTES
PublicPostRouter.get('/:post_id', (request, response) => {
    const {post_id} = request.params;
    if (!post_id || typeof parseInt(post_id) !== 'number') {
        response.status(400);
        response.json({
            'msg': `err. Please enter valid post_id.`,
        });
    } else {
        PostServices.readPostComments(post_id)
        .then(data => {
            response.status(200);
            response.json({
                'msg': `Success.`,
                'post': data,
            })
        })   
        .catch(err => {
            response.status(400);
            response.json({
                'msg': `err. Something went wrong.`,
            });
        });
    }
});

module.exports = PublicPostRouter;