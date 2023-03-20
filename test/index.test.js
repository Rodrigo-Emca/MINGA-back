import app from'../app.js'
import chai from "chai";
import request from 'supertest'


const assert = chai.assert
const expect = chai.expect

describe('Verificaciones', ()=>{
    it('GET a /mangas/:id debe verificar que el id que fue enviado por params es un objectId', async()=>{
        const response = await request(app).get('/mangas/640a29d7aa914d6b7c584710')
        const id = response.params._id
        assert.equal(req.body._id, id)
    })
})
