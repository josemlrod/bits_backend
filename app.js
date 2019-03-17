// NPM MODULES
const app = require('express')();
const bodyParser = require('body-parser');

// ROUTER MODULES   
const PublicUserRouter = require('./routes/public_user_router');

// MIDDLEWARE
app.use(bodyParser.json());
app.use('/user', PublicUserRouter);

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