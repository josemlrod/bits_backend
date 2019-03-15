// NPM MODULES
const app = require('express')();

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