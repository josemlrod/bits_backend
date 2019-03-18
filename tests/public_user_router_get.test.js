const request = require('supertest')

jest.mock('../services/database')
const db = require('../services/database');

// db.mockImplementation(() => {
//     return {
//         any: Promise.resolve({'test': 2})
//     }
// })

jest.mock('../services/user_services.js')
const UserServices = require('../services/user_services.js')
const {app,} = require('../app')

test('It returns 200 existing username is passed in', done => {
    UserServices.readUser.mockImplementation(() => Promise.resolve())
    
    request(app)
        .get('/user/josemlrod')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            if (err) throw new Error(`!!!! err`);
            done();
        });
})

test('It returns 404 nonexisting username is passed in', done => {
    UserServices.readUser.mockImplementation(() => Promise.reject())
    
    request(app)
        .get('/user/josemlrod')
        .then(response => {
            expect(response.status).toBe(404);
            done();
        })
})