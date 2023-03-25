import app from '../app.js'
import chai from 'chai'
import request from 'supertest';

const assert = chai.assert;
const expect = chai.expect;

describe('Pruebas sobre MANGAS', () => {

    it('GET /mangas verificar que se pasa token por headers', async () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWIwNTc3MTg4ZWMwYzE0MzE5OWRkNSIsImlhdCI6MTY3OTUxMDMzNiwiZXhwIjoxNjgwMTE1MTM2fQ.xYl3Z0LJhtuMDVUvmGxYET-fB3F0lt6UqqlHV0KDyYE'

        const response = await request(app)
            .get('/mangas/read')
            .auth(token, {type: 'bearer'})

            assert.equal(response.status, 200);

    }), 

    it('POST /mangas verificar que cover_photo es una url', async () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGEyOWQ2YWE5MTRkNmI3YzU4NDZmMyIsImlhdCI6MTY3OTM2MDU1MywiZXhwIjoxNjc5OTY1MzUzfQ.X3f6WaO1Eb_ZvpZuQrUHXbKiuZ8r8laOF4B2ATURcck'

        const manga = {
            title: 'Mi Manga',
            author: 'Tokito Wikimoto',
            cover_photo: 'https://ejemplo.com/imagen.jpg',
        }

        const response = await request(app)
            .post('/mangas/')
            .auth(token, {type: 'bearer'})
            .send(manga)

        assert.equal(response.status, 201)
        assert.match(response.body.cover_photo, /^https/, 'cover_photo is an url')

    }),


    it('POST mangas verificar que la respuesta devuelve "no autorizado" cuando no se pasa token	', async () => {

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGEyOWQ2YWE5MTRkNmI3YzU4NDZmMyIsImlhdCI6MTY3OTM2MDU1MywiZXhwIjoxNjc5OTY1MzUzfQ.X3f6WaO1Eb_ZvpZuQrUHXbKiuZ8r8laOF4B2ATURcck'

        const manga = {
            title: 'Mi Manga',
            author: 'Tokito Wikimoto',
            cover_photo: 'https://ejemplo.com/imagen.jpg',
        }

        const response = await request(app)
            .post('/mangas')
            // .auth(token, {type: 'bearer'})
            .send(manga)

        assert.equal(response.status, 401)
        assert.equal(response.text, 'Unauthorized')

        })
})