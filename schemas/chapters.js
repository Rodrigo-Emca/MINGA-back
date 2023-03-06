import Joi from "joi-oid";

const schema = Joi.object({
    title: Joi
        .string()
        .required()
        .min(5)
        .max(30)
        .messages({
            'string.min': 'El título debe tener al menos 5 caracteres',
            'string.max': 'El titulo debe tener menos de 30 caracteres'
        }),
    order:Joi
        .any(),
    pages: Joi
        .string()
        .required()
        .min(1)
        .messages({
            'string.min': 'la página debe contener al menos un caracter'
        }),
})

export default schema