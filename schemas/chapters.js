import Joi from "joi-oid";

const schema = Joi.object({
    title: Joi
        .string()
        .required()
        .min(5)
        .max(30)
        .messages({
            'string.min': 'the title must be at least 4 characteres',
            'string.empty': 'the title cannot be empty',
            'string.required': 'the title is required',
        }),
    order:Joi
        .number(),
    pages: Joi
        .string()
        .required()
        .min(1)
        .uri()
        .messages({
            'any.required': 'the pages have to be url',
            'string.empty': 'the pages cannot be empty'
        }),
    manga_id: Joi
        .string()
})

export default schema