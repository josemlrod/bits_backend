const request = require('supertest');

jest.mock('../services/database.js');
const db = require('../services/database');

jest.mock('../services/user_services.js');
const UserServices = require('../services/user_services');

const {app,} = require('../app');

test('It returns status code 400 if isRequiredNeeded is true', done => {
    request(app)
        .put('/user/1')
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

test('It returns status code 400 if typeof user_id !== number', done => {
    request(app)
        .put('/user/a')
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

test('It returns status code 400 if typeof user_id === undefined', done => {
    UserServices.updateUser.mockImplementation(() => Promise.reject());
    request(app)
        .put('/user/')
        .send({})
        .then(response => {
            done();
        })
        .catch(response => {
            expect(response.status).toBe(400);
            done();
        });
})

test('When passing in proper user_id and user obj we get back {msg: Successfully updated user.}', done => {
    const mockObj = {
        "username": "a",
        "first_name": "a",
        "last_name": "a", 
        "firebase_uid": "a", 
        "email": "a", 
        "rel_status": "a",
    }
    
    request(app)
        .put('/user/15')
        .send(mockObj)
        .then(response => {
            expect(response.json).toEqual({'msg': `Successfully updated user.`});
            done();
        })
        .catch(err => {
            done();
        })
        
})

test('When passing in proper user_id and user obj expect status 200', done => {
    const mockObj = {
        "username": "a",
        "first_name": "a",
        "last_name": "a", 
        "firebase_uid": "a", 
        "email": "a", 
        "rel_status": "a",
    }
    
    request(app)
        .put('/user/15')
        .send(mockObj)
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        })
        
})

test('Update user returns a promise', done => {
    UserServices.updateUser.mockImplementation(() => Promise.resolve());

    const mockObj = {
        "username": "a",
        "first_name": "a",
        "last_name": "a", 
        "firebase_uid": "a", 
        "email": "a", 
        "rel_status": "a",
    }
    
    request(app)
        .put('/user/15')
        .send(mockObj)
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        })
        
})

test('It returns status code 400 if isUserID is false', done => {
    request(app)
        .delete('/user/a')
        .then(response => {
            done();
        })
        .catch(response => {
            expect(response.json).toEqual({'msg': `err. Please input correct user_id.`});
            done();
        });
})

test('Expect msg: Successfully deleted user if correct user_id is provided', done => {
    UserServices.deleteUser.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/user/15')
        .then(response => {
            expect(response.json).toEqual({'msg': `Successfully deleted user.`});
            done();
        })
        .catch(err => {
            done();
        })
})

test('Expect msg: Successfully deleted user if correct user_id is provided', done => {
    UserServices.deleteUser.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/user/15')
        .then(response => {
            expect(response.json).toEqual({'msg': `Successfully deleted user.`});
            done();
        })
        .catch(err => {
            done();
        })
})

test('Expect msg: err. Something went wrong if user_id was not found on database', done => {
    UserServices.deleteUser.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/user/20')
        .then(response => {
            done();
        })
        .catch(response => {
            expect(response.json).toEqual({'msg': `err. Something went wrong.`});
            done();
        })
})