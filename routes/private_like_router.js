// NPM MODULE
const PrivateLikeRouter = require('express').Router();

// LOCAL MODULES
 const LikeServices = require('../services/like_services');

 // EXPRESS ROUTES
PrivateLikeRouter.post('/', (request, response) => {
    const {like_author, post_liked,} = request.body;
    if (!like_author || !post_liked) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        LikeServices.postLike(like_author, post_liked)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully posted like.`,
                });
            })
            .catch(err => {
                console.log(err)
                response.status(400);
                response.json({
                    'msg': `err. Something went wrong.`,
                });
            });
    }
});

module.exports = PrivateLikeRouter;