// NPM MODULES
const request = require('supertest');

// LOCAL MODULES
const PublicUserRouter = require('../routes/public_user_router');

// TESTS
// test('It returns status code 400 if isRequiredNeeded is true', done => {
//     request(PublicUserRouter)
//         .post('/user/')
//         .send({})
//         .catch(response => {
//             expect(response.status).toBe(400);
//             done();
//         });
// })

// test('It returns status code 200 if full obj w required keys is passed in', done => {
//     request(PublicUserRouter)
//         .post('/user')
//         .send({
//             "username": "someusername",
//             "first_name": "jose",
//             "last_name": "rodriguez", 
//             "firebase_uid": "someotherfirebaseid", 
//             "email": "someemail@gmail.com", 
//             "rel_status": "Taken",
//         })
//         .then(response => {
//             expect(response.status).toBe(200);
//             done();
//         });
// })

// test('If no username is passed in, it will return status code 400', done => {
//     request(PublicUserRouter)
//         .get('/')
//         .expect(400)
//         .end((err, res) => {
//             if(err) throw new Error('Something went wrong');
//         })
// })  