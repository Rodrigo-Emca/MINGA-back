import Author from "../../models/Author.js";

const controller = {
    getMe: async (req, res) => { 
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
};

export default controller


