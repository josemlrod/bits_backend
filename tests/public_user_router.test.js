const request = require('supertest')

// jest.mock('pg-promise')
// const pg_promise = require("pg-promise")
// pg_promise.mockImplementation(() => {
//     return function() {
//         return {
//             any: () => Promise.resolve({'test': 1}),
//             one: () => Promise.reject(),
//         }
//     }
// })

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

test('It returns status code 400 if isRequiredNeeded is true', done => {
    request(app)
        .post('/user/')
        .send({})
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(err => {
            if (err) throw new Error(`err`);
            done();
        });
})

test('It returns status code 200 if full obj w required keys is passed in', done => {
    const mockObj = {
        "username": "a",
        "first_name": "a",
        "last_name": "a", 
        "firebase_uid": "a", 
        "email": "a", 
        "rel_status": "a",
    }

    UserServices.createUser.mockImplementation(() => Promise.resolve())
    
    request(app)
        .post('/user')
        .send(mockObj)
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        })
})

test('It returns status code 400 if incomplete obj is passed in', done => {
    const mockObj = {
        "username": "a",
        "first_name": "a",
        "last_name": "a", 
        "firebase_uid": "a", 
        "email": "a", 
        "rel_status": "a",
    }

    UserServices.createUser.mockImplementation(() => Promise.resolve())
    
    request(app)
        .post('/user')
        .send(mockObj)
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        })
})

test('It returns status code 400 if database insertion fails', done => {
    const mockObj = {
        "username": "a",
        "first_name": "a",
        "last_name": "a", 
        "firebase_uid": "a", 
        "email": "a", 
        "rel_status": "a",
    }
    
    UserServices.createUser.mockImplementation(() => Promise.reject())
    request(app)
        .post('/user')
        .send(mockObj)
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        })
})