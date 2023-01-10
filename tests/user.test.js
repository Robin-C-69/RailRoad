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

describe('Router', () => {
    it('GET /user', async () => {
        await supertest(app).get('/user').expect(200).then((response) => {
            assert.equal(typeof(response.body), 'object')
        })
    })
})