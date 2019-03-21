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

/*
PrivateFollowRouter.post('/', (request, response) => {
    const {follower_user_id, followed_user_id} = request.body;
    if (!follower_user_id || !followed_user_id) {
        response.status(400);
        response.json({
            'msg': `err. Something went wrong.`,
        });
    } else {
        FollowServices.postFollow(follower_user_id, followed_user_id)
            .then(() => {
                response.status(200);
                response.json({
                    'msg': `Successfully posted follow.`,
                });
            })
            .catch(err => {
                response.status(400);
                response.json({
                    'msg': `err. Something went wrong.`,
                });
            });
    }
});

*/


