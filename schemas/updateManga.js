import Joi from 'joi-oid';

const schema = Joi.object({
    title: Joi
        .string()
        .min(3)
        .max(30)
        .messages({
            "string.min": "El titulo debe tener al menos 3 caracteres.",
            "string.max": "El titulo debe tener un máximo de 30 caracteres.",
    }),
    cover_photo: Joi
        .string()
        .uri(),
    description: Joi
        .string()
        .min(15)
        .max(2000)
        .messages({
            "string.min": "La descripción debe tener al menos 15 caracteres.",
            "string.max": "La descripción debe tener un máximo de 2000 caracteres.",
    }),
    category_id: Joi
        .objectId(),
})

export default schema