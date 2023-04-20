import Author from '../models/Author.js';

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los autores' });
  }
}

export { getAllAuthors };
