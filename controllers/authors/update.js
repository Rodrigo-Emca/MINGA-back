import Author from '../../models/Author.js'
import createError from "http-errors"

const controller = {
    update: async(req,res,next) => {
        try{
            let author = await Author.findOneAndUpdate(
                { user_id: req.user }, 
                req.body, 
                { new: true })
            
            if(author){
                return res.status(200).json({
                    success: true,
                    author
                })
            }
            return next ( createError(404, "no es author" ))

        }catch(error) {
            return next ( createError(400, error ))
        }
    }
}

export default controller

/* 
update: async(req,res,next) => {
        try{
            let author = await Author.findOneAndUpdate(//recibe 2 parametros
                { user_id: req.user }, //el 1° objeto de busqueda, por id
                req.body, //2° lo que quiero modificar, pueden pasar por body varios cambios! varios campos al mismo tiempo
                { new: true })//3° trae el documento actualizado
            
            if(author){
                return res.status(200).json({
                    success: true,
                    author
                })
            }
            return next ( createError(404, "no es author" ))

        }catch(error) {
            return next ( createError(400, error ))
        }
    }


*/