import express from 'express';
import validator from '../middlewares/authors/validator.js';
import passport from '../middlewares/auth/passport.js';
import postSchema from '../schemas/authors.js';
import schemaUpdate from '../schemas/authorsUpdate.js';
import find_id from '../middlewares/auth/find_id.js'
import is_active from '../middlewares/auth/is_active.js'
import upDateController from '../controllers/authors/update.js'
import get_authors from '../controllers/authors/get_me.js'
import controller from '../controllers/authors/create.js'
import readOne from '../controllers/authors/get_one.js'
import readActive from '../controllers/authors/read_all_active.js'
import updateActive from '../controllers/authors/update_active.js'

const router = express.Router();

const {getMe } = get_authors;
const { update } = upDateController;
const { create } = controller
const { read_one } = readOne
const { read_all_active } = readActive
const { update_active } = updateActive


router.post('/', passport.authenticate('jwt',{session:false}), validator(postSchema), create);
router.get("/me", passport.authenticate("jwt", {session: false}) , find_id, getMe);
router.put("/me",passport.authenticate("jwt", {session: false}), validator(schemaUpdate), find_id, is_active , update );
router.get('/:id', read_one )

router.put('/admin/prueba/:id',passport.authenticate("jwt", {session: false}),  update_active)
router.get('/admin/prueba' ,passport.authenticate("jwt", {session: false}), read_all_active)


export default router;
