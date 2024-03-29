import express from 'express'
import validator from '../middlewares/validator.js';
import schema from '../schemas/chapters.js';
import controllerChapter from '../controllers/get_one_chapters.js';
import controller from '../controllers/chapter.controller.js'
import existsOrder from '../middlewares/chapters/exists_order.js';
import nextOrder from '../middlewares/chapters/next_order.js';
import is_property_of from '../middlewares/authors/is_property_of.js'
import addFrontPhoto from '../middlewares/chapters/add_front_photo.js';
import passport from '../middlewares/auth/passport.js';
import is_active from '../middlewares/auth/is_active.js'
import { get } from 'mongoose';

import getchapters from '../controllers/chapters/get_chapters.js'
const { get_chapters } = getchapters

let router = express.Router();

router.post('/', passport.authenticate('jwt',{session:false}), /*is_active,*/ validator(schema), is_property_of, existsOrder, nextOrder, addFrontPhoto, controller.create)
router.get('/chapters', get_chapters)
router.get('/:id', controllerChapter.chapter)
export default router