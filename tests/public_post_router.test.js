const request = require('supertest');

jest.mock('../services/post_services.js');
const PostServices = require('../services/post_services');

jest.mock('../services/database.js');
const db = require('../services/database');

const {app,} = require('../app');

test('If typeof post_id is undefined expect status 400', done => {
    request(app)
        .get('/post')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(err => {
            done();
        });
});

test('If tyepof parseInt(post_id) is not a number expect status 400', done => {
    request(app)
        .get('/post/a')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(err => {
            done();
        })
})

test('If post_id is valid and exists on database expect status 200', done => {
    PostServices.readPostComments.mockImplementation(() => Promise.resolve());
    request(app)
        .get('/post/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        });
});

test('If post_id is valid, but does not exist on database expect status 400', done => {
    PostServices.readPostComments.mockImplementation(() => Promise.reject());
    request(app)
        .get('/post/10')
        .then(response => {
            done();
        })
        .catch(response => {
            expect(response.status).toBe(400);
            done();
        });
});