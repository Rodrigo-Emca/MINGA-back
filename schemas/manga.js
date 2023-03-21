import Joi from 'joi-oid';

const schema = Joi.object({
 

    title: Joi
        .string()
        .required()
        .min(3)
        .max(30)
        .message({
            'string.min': 'minimo 3 caracteres',
        }),
        

    description: Joi
        .string()
        .required()
        .min(10)
        .max(200)
        .messages({
            'string.min': 'minimo 3 caracteres',
        }),
        category: Joi
        .string()
        .required()


})

export default schema



