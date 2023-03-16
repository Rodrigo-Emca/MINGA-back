import Author from '../models/Author.js';

const createAuthor = async (req, res) => {
  try {
    const { name, birthdate } = req.body;

    // Verificar si ya existe un autor con el mismo nombre
    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor && existingAuthor.active) {
      return res.status(400).json({ message: 'Author already exists' });
    }

    // Crear un nuevo autor y guardarlo en la base de datos
    const createdBy = req.user.id;
    const author = new Author({
      name,
      lastName,
      city,
      country,
      birthdate,
      imageUrl,
      // createdBy,
      active: true,
    });
    const savedAuthor = await author.save();

    // Devolver el autor creado en la respuesta de la solicitud
    return res.status(201).json({
      message: 'Author created successfully',
      author: savedAuthor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating author' });
  }
};

export default createAuthor;



