import passport from 'passport'
import passportJwt from 'passport-jwt'
import User from '../models/User.js'

passport.use(
    new passportJwt.Strategy({
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    },
    async (jwt_payload,done) => {
        console.log(jwt_payload)
        try {
            let user = await User.findOne({_id:jwt_payload.id})
            console.log(user)
            if (user) {
                user = {_id: user._id, name: user.name, mail: user.mail, photo: user.photo, is_online: user.is_online, is_admin: user.is_admin, is_author: user.is_author,  is_company: user.is_company, is_verified: user.is_verified}
                return done(null, user)
            } else {
                return done(null, false)
            }
            } catch (error) {
                console.log(error)
                return done(error,false)
            }
        }
)
)

export default passport
