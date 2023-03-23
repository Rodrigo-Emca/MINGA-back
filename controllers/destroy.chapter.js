import Chapter from "../models/Chapter.js";

const controllerD = {

    destroy: async(req, res, next)=>{
        try{
            let { id } = req.params
            let dest = await Chapter.findByIdAndDelete(
                {_id: id}
                )
            if(dest){
                res.status(200).json({
                    succes: true,
                    message: 'Chapter removed successfully'
                })
            }else{
                res.status(400).json({
                    succes: false,
                    message: 'Could not delete chapter'
                })
            }
        }
        catch(error){
            next(error)
        }
    }
}

export default controllerD