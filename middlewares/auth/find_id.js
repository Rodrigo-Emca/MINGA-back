import User from '../../models/User.js';
import Author from '../../models/Author.js'

async function finds_id(req,res,next) {
    try {
        const user = await User.findById(req.body.user._id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no existe.'
                })
        }

        const author = await Author.findOne({ user: user._id });
        if (!author) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no es un autor.'
                })
        }

        req.body.author_id = author._id;
        next();
    } catch (err) {
        next(err);
    }
}

export default finds_id