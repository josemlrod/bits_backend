const request = require('supertest')

jest.mock('../services/database')
const db = require('../services/database');

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

test('It returns 200 existing firebase_uid is passed in', done => {
    UserServices.readUserByID.mockImplementation(() => Promise.resolve())
    
    request(app)
        .get('/user/id/mockfirebaseuid')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            if (err) throw new Error(`!!!! err`);
            done();
        });
})

test('It returns 404 nonexisting firebase_uid is passed in', done => {
    UserServices.readUserByID.mockImplementation(() => Promise.reject())
    
    request(app)
        .get('/user/id/nonexistentuid')
        .then(response => {
            expect(response.status).toBe(404);
            done();
        })
})

test('It returns 200 existing user_id is passed in', done => {
    UserServices.getUserPosts.mockImplementation(() => Promise.resolve())
    
    request(app)
        .get('/user/posts/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            if (err) throw new Error(`!!!! err`);
            done();
        });
})

test('It returns 400 non-existing user_id is passed in', done => {
    UserServices.getUserPosts.mockImplementation(() => Promise.reject())
    
    request(app)
        .get('/user/posts/1')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(err => {
            if (err) throw new Error(`!!!! err`);
            done();
        });
})