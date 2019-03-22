// REQUIRED MODULES
const {app,} = require('./app');

// GLOBAL VARIABLES
const port = process.env.PORT || 3000; 

// EXPRESS ROUTES
app.listen(port, () => {
    console.log(`App is running on port #${port}`);
});