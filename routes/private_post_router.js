// NPM MODULES
const PrivatePostRouter = require('express').Router();

// LOCAL MODULES
const PostServices = require('../services/post_services');

PrivatePostRouter.post('/', (request, response) => {
    const {post_author, post_img, post_text} = request.body;
    if (!post_author || !post_img || !post_text) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        PostServices.createPost(post_author, post_img, post_text)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully created post.`,
                });
            })
            .catch(err => {
                response.status(400);
                response.json({
                    'msg': `err, Something went wrong.`,
                });
            });
    }
});

PrivatePostRouter.put('/:post_id', (request, response) => {
    const {post_id,} = request.params;
    if (!post_id || typeof parseInt(post_id) !== 'number') {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        const {post_author, post_img, post_text,} = request.body;
        PostServices.updatePost(post_author, post_img, post_text, post_id)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully updated post.`,
                });
            })
            .catch(err => {
                response.status(400);
                response.jsonp({
                    'msg': `err. Something went wrong.`,
                });
            });
    }
});

PrivatePostRouter.delete('/:post_id', (request, response) => {
    const {post_id,} = request.params;
    if (!post_id || typeof parseInt(post_id) !== 'number') {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        PostServices.deletePost(post_id)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully deleted post.`,
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

module.exports = PrivatePostRouter;