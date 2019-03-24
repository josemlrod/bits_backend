var admin = require("firebase-admin");

var serviceAccount = require("./firebase_key.json");

const AdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bits-786a3.firebaseio.com"
});

module.exports = AdminApp;