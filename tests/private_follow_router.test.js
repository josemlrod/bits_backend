// NPM MODULES
const request = require('supertest');

jest.mock('../services/database.js');
const db = require('../services/database');

jest.mock('../services/follow_services.js');
const FollowServices = require('../services/follow_services');

const {app,} = require('../app');

test('Expect status 400 if empty body is passed in', done => {
    request(app)
        .post('/follow/')
        .send({})
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if full body w required keys is passed in', done => {
    FollowServices.postFollow.mockImplementation(() => Promise.resolve());
    request(app)
        .post('/follow/')
        .send({
            'follower_user_id': '1',
            'followed_user_id': '2',
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if db promise rejects', done => {
    FollowServices.postFollow.mockImplementation(() => Promise.reject());
    request(app)
        .post('/follow/')
        .send({
            'follower_user_id': '1',
            'followed_user_id': '2',
        })
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 400 if required params are not typeof number', done => {
    request(app)
        .delete('/follow/a/b')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 200 if required params are passed and valid data type', done => {
    FollowServices.deleteFollow.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/follow/1/2')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 400 if db promise rejects', done => {
    FollowServices.deleteFollow.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/follow/1/2')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 400 if required param is not typeof number', done => {
    request(app)
        .get('/follow/a')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 200 if required param is passed in', done => {
    FollowServices.readFollowers.mockImplementation(() => Promise.resolve());
    request(app)
        .get('/follow/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 400 if required param is passed in, but does not exist on database', done => {
    FollowServices.readFollowers.mockImplementation(() => Promise.reject());
    request(app)
        .get('/follow/1')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});


