import Author from "../../models/Author.js"

async function is_active(req,res,next){
    const author = await Author.findOne({user_id: req.user._id})
    if(author){
        if(author.active){
            next()
        } else {
            return res.status(400).json({
                success: false,
                message: 'Author is not active'
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'No authors founded'
        })
    }
}
<<<<<<< HEAD

export default is_active


=======

export default is_active
>>>>>>> 26a02d89ad3f2c977e791b93d219bc1d68ac7020
