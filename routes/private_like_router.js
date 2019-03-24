// NPM MODULES
const PrivateLikeRouter = require('express').Router();

// LOCAL MODULES
 const LikeServices = require('../services/like_services');
 const checkFirebaseToken = require('../services/firebase_auth');

 app.use(checkFirebaseToken);

 // EXPRESS ROUTES CALLBACKS
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
                response.status(400);
                response.json({
                    'msg': `err. Something went wrong.`,
                });
            });
    }
});

PrivateLikeRouter.delete('/:post_liked', (request, response) => {
    const {post_liked,} = request.params;
    if (!post_liked || isNaN(parseInt(post_liked))) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        LikeServices.deleteLike(post_liked)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully deleted like`,
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

module.exports = PrivateLikeRouter;