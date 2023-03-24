import express from 'express';
import createAuthor from '../controllers/author.controller.js';
import validator from '../middlewares/authors/validator.js';
import passport from '../middlewares/auth/passport.js';
import postSchema from '../schemas/authors.js';
import schemaUpdate from '../schemas/authorsUpdate.js';
import find_id from '../middlewares/auth/find_id.js'
import is_active from '../middlewares/auth/is_active.js'
import upDateController from '../controllers/authors/update.js'
import get_authors from '../controllers/authors/get_me.js'
import read_allController from '../controllers/authors/read_all.js'
import { getAllAuthors } from '../controllers/authorController.js';
const router = express.Router();

const {getMe } = get_authors;
const { read_all} = read_allController;
const { update } = upDateController;




router.get('/', getAllAuthors);
router.post('/create', passport.authenticate('jwt',{session:false}), validator(postSchema), createAuthor);

router.get("/me", passport.authenticate("jwt", {session: false})/* ,find_id, */, getMe);
router.put("/me",passport.authenticate("jwt", {session: false}), validator(schemaUpdate),/*  find_id, */ is_active , update );


export default router;
