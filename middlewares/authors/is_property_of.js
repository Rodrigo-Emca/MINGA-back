import Manga from '../../models/Manga.js';

const is_property_of = async (req, res, next) => {
  console.log(req.body)
  try {
    const manga = await Manga.findById(req.body.manga_id);
    if(!manga){
      return res.status(404).json({
        message: 'manga no existe'
      })
    }
    if (String(manga.author_id) !== String(req.user._id)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.manga = manga;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error validating manga ownership' });
  }
};

export default is_property_of;
