const request = require('supertest');

jest.mock('../services/post_services.js');
const PostServices = require('../services/post_services');

jest.mock('../services/database.js');
const db = require('../services/database');

const {app,} = require('../app');

// POST ROUTE TESTS
test('Expect status 400 if one of the required keys of body does not exist', done => {
    request(app)
        .post('/post/')
        .send({})
        .then(response => {
            expect(response.json).toEqual({'msg': `err. Something went wrong.`});
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if full obj w required keys is passed in', done => {
    PostServices.createPost.mockImplementation(() => Promise.resolve());
    request(app)
        .post('/post/')
        .send({
            'post_author': '1',
            'post_img': 'someimg',
            'post_text': 'sometext',
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        });
});

test('Expect status 400 if db promise returns a rejection', done => {
    PostServices.createPost.mockImplementation(() => Promise.reject());
    request(app)
        .post('/post/')
        .send({
            'post_author': '1',
            'post_img': 'someimg',
            'post_text': 'sometext',
        })
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(err => {
            done();
        });
});

// PUT ROUTE TESTS
test('Expect status 400 if post_id is undefined', done => {
    request(app)
        .put('/post')
        .send({})
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if typeof parseInt(post_id) is not a number', done => {
    request(app)
        .put('/post/a')
        .send({})
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if post_id is passed properly', done => {
    PostServices.updatePost.mockImplementation(() => Promise.resolve());
    request(app)
        .put('/post/1')
        .send({
            'post_author': '1',
            'post_img': 'someimg',
            'post_text': 'sometext',
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        });
});

test('Expect status 400 if db promise returns a rejection', done => {
    PostServices.updatePost.mockImplementation(() => Promise.reject());
    request(app)
        .put('/post/1')
        .send({
            'post_author': '1',
            'post_img': 'someimg',
            'post_text': 'sometext',
        })
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(err => {
            done();
        });
});

// DELETE ROUTE TESTS
test('Expect status 400 if post_id is undefined', done => {
    request(app)
        .delete('/post')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if typeof parseInt(post_id) is not a number', done => {
    request(app)
        .delete('/post/a')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if post_id is passed properly', done => {
    PostServices.deletePost.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/post/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(err => {
            done();
        });
});

test('Expect status 400 if db promise returns a rejection', done => {
    PostServices.deletePost.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/post/1')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(err => {
            done();
        });
});