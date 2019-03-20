// NPM MODULES
const PrivatePostRouter = require('express').Router();

// LOCAL MODULES
const PostServices = require('../services/post_services');

PrivatePostRouter.post('/', (request, response) => {
    const {post_author, post_img, post_text} = request.body;
    if (!post_author || !post_img || !post_text) {
        console.log('something heere')
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        console.log(request.params);
        PostServices.createPost(post_author, post_img, post_text)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Success`,
                });
            })
            .catch(err => {
                console.log(err);
                response.status(400);
                response.json({
                    'msg': `err, Something went wrong.`,
                });
            });
    }
})

module.exports = PrivatePostRouter;