import Author from "../../models/Author.js";

const controller = {
    get_me: async (req, res) => {
        try {
            let me = await Author.findOne({ user_id:req.user })
                .select("name city country date photo ")
               
            if (me) {
                return res.status(200).json({
                    success: true,
                    me,
                });
            }
            return next(createError(404, "Author not found"))
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Server error",
            });
        }
    },
    getMe:async(req,res,next)=>{
        try{
            let author = await Author.findOne({user_id: req.user})
            if(author){
                return res.status(200).json({
                    success:true,
                    author
                })
            }
            return next(createError(404,'No author Found'))
        }catch(err){
            next(err)
        }
    },
};

export default controller



