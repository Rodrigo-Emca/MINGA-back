import Author from '../../models/Author.js'

const controller = {
    getMe: async(req,res,next ) => {
      console.log(req.user)
      try{
          let author = await Author.findOne({user_id: req.user._id})
            if(author){
              return res.status(200).json({
                success: true,
                author
            })
      }
        return res.status(404).json({
          success: false,
          message: "No authors found"
        })
      }catch(error){
            return res.status(400).json({
             success: false,
             message: "Unexpected error"
        })
      } 
      
    },
    get_one: async (req, res) => {
        try {
          let author = await Author.findOne({_id: req.params.id}).select(
            "name city country createdAt photo -_id"
          );
          if (author) {
            return res.status(200).json({
              success: true,
              data: author,
            });
          } else {
            return res.status(404).json({
              success: false,
              message: "This author dont exist already!",
            });
          }
        } catch (error) {
          return res.status(404).json({
            success: false,
            message: "This author dont exist already!",
          });
        }
    }

   
}

export default controller


