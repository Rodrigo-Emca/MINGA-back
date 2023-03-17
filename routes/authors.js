import express from 'express';
import createAuthor from '../controllers/author.controller.js';
import Author from '../models/Author.js';
import is_active from '../middlewares/auth/is_active.js'; // importar el middleware
import validator from '../middlewares/authors/validator.js';
import postSchema from '../schemas/authors.js';
import passport from 'passport';
import { getAllAuthors } from '../controllers/authorController.js';

const router = express.Router();


// Obtener todos los autores
router.get('/', getAllAuthors);

// Crear un nuevo autor

router.post('/', passport.authenticate('jwt',{session:false}), validator(postSchema), createAuthor);


export default router;