import Author from '../../models/Author.js';
import authorSchema from '../../schemas/authors.js';

export const createAuthor = async (req, res) => {
  try {
    const { error, value } = authorSchema.validate(req.body);
    if (error) {
      // Si hay errores de validación, devolver un error al cliente
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const author = new Author(value);
    await author.save();
    res.status(201).json({ message: 'Autor creado correctamente', author });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el autor' });
  }
}
