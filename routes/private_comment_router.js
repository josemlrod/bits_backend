// NPM MODULE
const PrivateCommentRouter = require('express').Router();

// LOCAL MODULE
const CommentServices = require('../services/comment_services');

// EXPRESS ROUTES
PrivateCommentRouter.post('/', (request, response) => {
    const {comment_author, post_id, comment_text} = request.body;
    if (!comment_author || !post_id || !comment_text) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        CommentServices.createComment(comment_author, post_id, comment_text)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully posted comment`,
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

PrivateCommentRouter.delete('/:comment_id', (request, response) => {
    const {comment_id} = request.params;
    if (!comment_id || typeof parseInt(comment_id) !== 'number') {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        CommentServices.deleteComment(comment_id)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully deleted comment.`,
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

module.exports = PrivateCommentRouter;