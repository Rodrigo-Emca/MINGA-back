import express from 'express'
import controller from '../controllers/auth/auth.js';
import postSchemaSignUp from '../schemas/usersSignUp.js'
import validator from '../middlewares/validator.js';
import accountExistsSignUp from '../middlewares/accountExistsSignUp.js'

import postSchemaSignIn from '../schemas/usersSignIn.js'
import accountExistsSignIn from '../middlewares/accountExistsSignIn.js'
import accountHasBeenVerified from '../middlewares/accountHasBeenVerified.js'
import passwordIsOk from '../middlewares/passwordIsOk.js'

import passport from '../middlewares/passport.js'

let router = express.Router();

const {sign_up, sign_in, sign_out, signintoken} = controller

/* GET users listing. */
router.get('/', (req, res, next) => {
  return res
    .send('Aqui deberían aparecer todos los usuarios.')
    .status(200)
});

//POST auths listing:

router.post('/signup', 
  validator(postSchemaSignUp),
  accountExistsSignUp,
  sign_up
)

router.post('/signin', 
  validator(postSchemaSignIn),
  accountExistsSignIn,
  accountHasBeenVerified,
  passwordIsOk,
  sign_in
)

router.post('/signout',
  passport.authenticate('jwt',{session:false}),
  sign_out
)

router.post('/token', passport.authenticate('jwt',{session:false}),token)

export default router