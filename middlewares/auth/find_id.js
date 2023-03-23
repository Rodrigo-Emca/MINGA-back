import User from '../../models/User.js';
import Author from '../../models/Author.js'

async function finds_id(req,res,next) {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no existe.'
                })
        }

        const author = await Author.findOne({ user_id: user._id });
        if (!author) {
            return res.status(400).json({
                success: false,
                message: 'El usuario no es un autor.'
                })
        }
        console.log(author)
        req.body.author_id = author._id;
        console.log('Pasó el find_id con exito')
        next();
    } catch (err) {
        console.log('No ha pasado el finds_id')
        next(err);
    }
}

export default finds_id
