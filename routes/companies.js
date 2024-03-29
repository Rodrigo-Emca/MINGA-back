import express from 'express'
import controller from '../controllers/companys/companies.js'
import schema from '../schemas/companies.js'
import validator from '../middlewares/validator.js'
import passport from '../middlewares/passport.js'

const { create, read_all, read_allActive, update } = controller
let router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), validator(schema), create)
router.get('/', read_all)
router.get('/admin'  ,passport.authenticate('jwt', { session: false })  ,read_allActive)
router.put('/admin/:id'  ,passport.authenticate('jwt', { session: false }) ,update)

export default router

