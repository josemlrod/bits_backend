// REQUIRED MODULES
const {app,} = require('./app');

// GLOBAL VARIABLES
const port = 3000; 

// EXPRESS ROUTES
app.listen(port, () => {
    console.log(`App is running on port #${port}`);
});