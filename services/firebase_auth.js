const admin = require('../firebase')

const checkFirebaseToken = (request, response, next) => {
    const {token} = request.body;
    console.log('here')
    admin.auth().verifyIdToken(token)
      .then(decodedToken => {
        const uid = decodedToken.uid;
        next();
      }).catch(err => {
        console.log(err);
        response.status(400);
        response.json({
            'msg': 'err. Something went wrong',
        });
      });
}

module.exports = checkFirebaseToken;