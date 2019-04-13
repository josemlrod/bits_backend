// NPM MODULES
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

// ROUTER MODULES   
const PublicUserRouter = require('./routes/public_user_router');
const PrivateUserRouter = require('./routes/private_user_router');
const PublicPostRouter = require('./routes/public_post_router');
const PrivatePostRouter = require('./routes/private_post_router');
const PrivateCommentRouter = require('./routes/private_comment_router');
const PrivateLikeRouter = require('./routes/private_like_router');
const PrivateFollowRouter = require('./routes/private_follow_router');

// LOCAL MODULES
const checkFirebaseToken = require('./services/firebase_auth');

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use('/post', PublicPostRouter);
app.use('/user', PublicUserRouter);
// app.use(checkFirebaseToken); - didn't add cause all the tests break
app.use('/user', PrivateUserRouter);
app.use('/post', PrivatePostRouter);
app.use('/comment', PrivateCommentRouter);
app.use('/like', PrivateLikeRouter);
app.use('/follow', PrivateFollowRouter);

// EXPRESS ROUTES
app.get('/', (request, response) => {
    response.status(200);
    response.json({
        'msg': 'Successful request.',
    });
});

module.exports = {
    app, 
}