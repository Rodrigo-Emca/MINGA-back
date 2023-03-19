import Manga from '../models/Manga.js'
import Chapter from '../models/Chapter.js'

const controller = {
  create: async (req, res) => {
    try {
      req.body.author_id = "63fe8112f09373806fd89fe5"

      let manga = await Manga.create(req.body);
      return res.status(201).json({
        success: true,
        message: "se creo un nuevo manga",

      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "no se pudo crear un manga",
      });
    }
  },

  get_mangas: async (req, res, next) => {

    let consultas = {}
    
    let pagination = {
      page: 1, 
      limit: 6
    }
    
    if (req.query.title) {
      consultas.title = new RegExp(req.query.title.trim(),'i')
      pagination.limit = 10
    }

    if (req.query.category_id) {
        const categ = req.query.category_id.split(',');
        consultas.category_id = {$in:categ}
        pagination.limit = 10
    } 
    if (req.query.page) {
      pagination.page = req.query.page
    }
    if (req.query.quantity) { 
      pagination.limit = req.query.quantity
    }
    try {
      let all = await Manga.find(consultas)
      .select('title category_id cover_photo')
      .sort({ title: 1})  
      .skip( pagination.page > 0 ? (pagination.page-1)*pagination.limit : 0 )
      .limit( pagination.limit > 0 ? pagination.limit : 0 )
      .populate("category_id", "name -_id")

      return res.status(200).json({ 
        success: true,
        message: "All mangas",
        mangas: all
      })

    }
    catch(err) {
      next(err)
    } 
  }, 

  get_one: async (req, res, next) => {
    let query = {}
    if (req.query._id) { query._id = req.query._id }
    try {
      let one = await Manga.findById(query)
        // .select("name -_id")
      return res
        .status(200)
        .json({ 
          mangas: {
            title: one.title, 
            decription: one.description, 
            cover_photo: one.cover_photo,
            category: one.category}})
    }
    catch(err) {
      next(err)
    }
  },

  get_me: async (req, res, next) => {
          try {
              let order = { title: 1 }
              if (req.query.order == 1 || req.query.order == -1) {
                  order.title = req.query.order
              }

              let pagination = { page: 1, limit: 6 }
              if (req.query.page) {
                  pagination.page = Number(req.query.page)
              }

              let query = {}
              query.author_id = req.body.author_id

              let mangas = await Manga.find(query)
                  .select("title author_id category_id cover_photo _id")
                  .sort(order)
                  .skip( pagination.page > 0 ? (pagination.page-1)*pagination.limit : 0 )
                  .limit(pagination.limit > 0 ? pagination.limit : 0)
                  .populate("category_id", "name -_id")
                  
              if(mangas){
                  return res.status(200).json({
                      success: true,
                      mangas
                  })
              }else{
                  return res.status(404).json({
                      success: false,
                      message: "No se han encontrado mangas."
                  })
              }
          }catch(error){
              next(error)
      }
    },

    //Agregar controlador UPDATE
    update: async (req,res,next) => {
      try{
          let { id } = req.params
          let manga = await Manga.findOneAndUpdate(
              {_id: id},
              req.body,
              {new: true} //optional
          )
          if(manga){
              return res.status(200).json({
                  success: true,
                  message: "Updated",
                  manga
              })
          }else{
              return res.status(404).json({
                  success: false,
                  message: "Manga no encontrado"
              })
          }
      }catch(error){
          next(error)
      }
  },

    //Agregar controlador DESTROY
    destroy: async (req,res,next) => {
      try{
          let {id} = req.params
          let manga = await Manga.findOneAndDelete(
              { _id: id }
          )
          if(manga){
              await Chapter.deleteMany(
                  {manga_id: req.params.id}
              )

              return res.status(200).json({
                  success: true,
                  message: "El Manga ha sido eliminado",
              })
          }else{
              return res.status(404).json({
                  success: false,
                  message: "El Manga no ha sido encontrado"
              })
          }
      }catch(error){
          next(error)
      }
  }
}

export default controller
