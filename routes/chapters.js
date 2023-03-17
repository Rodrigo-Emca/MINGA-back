import express from 'express'
import validator from '../middlewares/validator.js';
import schema from '../schemas/chapters.js';
import Chapther from '../models/Chapter.js';
import controller from '../controllers/chapter.controller.js'
import existsOrder from '../middlewares/chapters/exists_order.js';
import nextOrder from '../middlewares/chapters/next_order.js';
import addFrontPhoto from '../middlewares/chapters/add_front_photo.js';
import passport from '../middlewares/auth/passport.js';
import is_active from '../middlewares/auth/is_active.js'
let router = express.Router();

router.post('/',passport.authenticate('jwt',{session:false}),/* is_active,*/ validator(schema), existsOrder, nextOrder, addFrontPhoto, controller.create)

export default router