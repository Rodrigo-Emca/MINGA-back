import userRouter from './users.js'
import chaptersRouter from './chapters.js'
import authorRouter from './authors.js';
import mangaRouter from './mangas.js'
import companiesRouter from './companies.js'

import paymentRouter from './payment.js'


import express from 'express';
let router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter)
router.use('/chapters', chaptersRouter)
router.use('/auth', userRouter)
router.use('/authors', authorRouter);
router.use('/authors', authorRouter);
router.use('/mangas', mangaRouter)
router.use('/auth', userRouter)
router.use('/companies',companiesRouter)

router.use('/payment',paymentRouter)


export default router

