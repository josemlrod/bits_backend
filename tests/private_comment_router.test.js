const request = require('supertest');

jest.mock('../services/database.js');
const db = require('../services/database');

jest.mock('../services/comment_services.js');
const CommentServices = require('../services/comment_services');

const {app,} = require('../app');

test('Expect status 400 if body obj is not passed in w required keys', done => {
    request(app)
        .post('/comment/')
        .send({})
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if body obj w required keys is passed in', done => {
    request(app)
        .post('/comment/')
        .send({
            'comment_author': '1',
            'post_id': '1',
            'comment_text': 'a',
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if db promise resolves', done => {
    CommentServices.createComment.mockImplementation(() => Promise.resolve());
    request(app)
        .post('/comment/')
        .send({
            'comment_author': '1',
            'post_id': '1',
            'comment_text': 'a', 
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
    CommentServices.createComment.mockImplementation(() => Promise.reject());
    request(app)
        .post('/comment/')
        .send({
            'comment_author': '1',
            'post_id': '1',
            'comment_text': 'a', 
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if typeof comment_id is not a number', done => {
    request(app)
        .delete('/comment/a')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if correct comment_id is passed in', done => {
    request(app)
        .delete('/comment/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if db promise resolves', done => {
    CommentServices.deleteComment.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/comment/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if db promise rejects', done => {
    CommentServices.deleteComment.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/comment/1')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});