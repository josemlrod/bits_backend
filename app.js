// NPM MODULES
const app = require('express')();
const bodyParser = require('body-parser');

// ROUTER MODULES   
const PublicUserRouter = require('./routes/public_user_router');
const PrivateUserRouter = require('./routes/private_user_router');
const PublicPostRouter = require('./routes/public_post_router');
const PrivatePostRouter = require('./routes/private_post_router');

// MIDDLEWARE
app.use(bodyParser.json());
app.use('/user', PublicUserRouter);
app.use('/user', PrivateUserRouter);
app.use('/post', PublicPostRouter);
app.use('/post', PrivatePostRouter);

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