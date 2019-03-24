const admin = require('../firebase')

const checkFirebaseToken = (request, response, next) => {
    const {token} = request.body;
    admin.auth().verifyIdToken(token)
      .then(decodedToken => {
        const uid = decodedToken.uid;
        next();
      }).catch(err => {
        response.status(400);
        response.json({
            'msg': 'err. Something went wrong',
        });
      });
}

module.exports = checkFirebaseToken;