import express from 'express';
import passport from 'passport'
import donationController from '../controllers/PaymentControllers.js';

const router = express.Router();
const {createPayment} = donationController

router.post('/', passport.authenticate('jwt',{session:false}), createPayment);

export default router;