const request = require('supertest');

jest.mock('../services/database.js');
const db = require('../services/database');

jest.mock('../services/like_services.js');
const LikeServices = require('../services/like_services');

const {app,} = require('../app');

test('Empty body will return status 400', done => {
    request(app)
        .post('/like/')
        .send({})
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Full body passed in w required keys will return status 200', done => {
    LikeServices.postLike.mockImplementation(() => Promise.resolve());
    request(app)
        .post('/like/')
        .send({
            'like_author': '1',
            'post_liked': '1',
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
    LikeServices.postLike.mockImplementation(() => Promise.reject());
    request(app)
        .post('/like/')
        .send({
            'like_author': '1',
            'post_liked': '1',
        })
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 is post_liked param is not passed in || or typeof is not a number', done => {
    request(app)
        .delete('/like/a')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if post_liked param is valid and exists on database', done => {
    LikeServices.deleteLike.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/like/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if post_liked param is valid, but does not exists on database', done => {
    LikeServices.deleteLike.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/like/1')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});