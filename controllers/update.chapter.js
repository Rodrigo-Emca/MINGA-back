import Chapter from "../models/Chapter.js";

const controllerUp = {
    update: async(req, res, next)=>{
    try{
        let { id } = req.params
        let upd = await Chapter.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        if(upd){
                
            return res.status(200).json({
                success: true,
                upd,
            })
        }else {
            return res.status(404).json({
                success: false,
                message: "Chapter not found"
            })
        }
    }
    catch(error){
        next(error)
    }
}
}

export default controllerUp