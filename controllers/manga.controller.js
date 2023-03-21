import Manga from '../models/Manga.js'


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
      
     /*  populate({
        path: 'category_id',
        match: {name: 'shonen'}
      }) */

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
    // let query = {}
    // if (req.query._id) { query._id = req.query._id }
    try {
      let one = await Manga.findById(/*query*/ req.params._id)
        // .select("name -_id")
      return res
        .status(200)
        .json({ 
          mangas: {
            title: one?.title, 
            decription: one?.description, 
            cover_photo: one?.cover_photo,
            category: one?.category_id}})
    }
    catch(err) {
      next(err)
    }
  }
}

export default controller
