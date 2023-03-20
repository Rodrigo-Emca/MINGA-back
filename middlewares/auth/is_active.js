import Author from '../../models/Author.js';

const is_active = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    console.log('author', author)
    if (!author || !author.active) {
      return res.status(404).json({ message: 'Author not found or inactive' });

    }

    req.author = author;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error validating author' });
  }
};

export default is_active;

