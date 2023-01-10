const assert = require('assert').strict
const supertest = require('supertest')
const app = require('../src/index')

const objectUser = {
    "_id": String,
    "pseudo": String,
    "email": String,
    "password": String,
    "role": String,
    "__v": Number
}

// Tests for user endpoint
describe('User', () => {
    it('Get all users', async () => {
        await supertest(app)
        .get('/user')
        .expect(200)
        .then((response) => {
            assert.equal(typeof(response.body), 'object')
        })
    })
    it('Create user', async () => {
        const userTest = {
            pseudo: "testuser",
            email: "test@test.fr",
            password: "T3st",
            role: "user"
        }
        await supertest(app)
        .post('/user')
        .send(userTest)
        .expect(201)
        .then((response) => {
            assert.equal(typeof(response.body), 'object')
        })
    })
})
