import Chapter from "../models/Chapter.js"

const controllerChapter = {
    chapter: async (req, res, next) =>{
        try {
            let chapter = await Chapter.findById(req.params.id)
                .select('-__v -updatedAt -createdAt -_id')

            let next = await Chapter.findOne({manga_id: chapter.manga_id, order: chapter.order + 1 })
            let prev = await Chapter.findOne({manga_id: chapter.manga_id, order: chapter.order - 1 })
            
            if (chapter) {

                return res.status(200).json({
                    success: true,
                    chapter,
                    prev: prev?._id,
                    next: next?._id
                })
            }

            return res.status(404).json({
                success: false,
            })

        } catch (error) {
            next(error)
        }
    }
}

export default controllerChapter