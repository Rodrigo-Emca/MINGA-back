import Chapter from '../../models/Chapter.js'

async function existsOrder(req, res, next){
    req.body.manga_id= '63ffafade652fa554fe009eb'
    const chapter = await Chapter.findOne({manga_id: req.body.manga_id, order: req.body.order})
    if(!chapter){
        return next()
    }
    if(chapter){
        return res.status(400).json({
            success: false,
            message: 'el order ya existe'
        })
    }
}

export default existsOrder