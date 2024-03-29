import User from "../../models/User.js";
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const controller = {

    sign_up: async (req, res, next) => {
        req.body.name = false
        req.body.is_online = false
        req.body.is_admin = false
        req.body.is_author = false
        req.body.is_company = false
        req.body.is_verified = true
        req.body.verify_code = crypto.randomBytes(10).toString('hex')
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
        try {
            await User.create(req.body)
            return res.status(200).json({
                success: true,
                message: '¡Usuario registrado!'
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
        },

    sign_in: async (req, res, next) => {
        console.log(req.user)
        try {
            let user = await User.findOneAndUpdate(
                { mail: req.user.mail },
                { is_online: true },
                { new: true }
            )
            console.log(user)
            user.password = null
            const token = jsonwebtoken.sign(
                {id: user.id},
                process.env.SECRET,
                {expiresIn: 60*60*24*7}
                )
            return res.status(200).json({
                success: true,
                message: '¡Usuario online!',
                name: req.user.name, 
                mail: req.user.mail, 
                photo: req.user.photo,
                token: token
            })
        } catch (error) {
        next(error)
        }
        },

    sign_out: async (req, res, next) => {
        console.log(req.user)
        const { mail } = req.user
        try {
            await User.findOneAndUpdate(
            { mail },
            { is_online: false },
            { new: true }
            )
            return res.status(200).json({
                success: true,
                message: '¡Usuario offline!',
            })
        } catch (error) {
            next(error)
        }
        },

        token: async (req, res, next) => {
            let { user } = req
            try {
                req.body.success = true
                req.body.sc = 200
                req.body.data = { user }
                return res.status(200).json(user)
            } catch (error) {
                next(error)
            }
        },
}


export default controller