import Joi from 'joi-oid'

const schema = Joi.object({
    name: Joi
        .string()
        .required()
        .min(4)
        .messages({
            'string.min':'El nombre debe tener un minimo de 4 caracteres.'
        }),
    mail: Joi// email: Joi
        .string()
        .required()
        .email({minDomainSegments: 2})
        .messages({
            'any.required': 'No se ha ingresado un mail válido',
            'string.empty': 'No se ha ingresado ningún mail.',
            'string.email': 'El mail ingresado es inválido.'
        }),
    photo: Joi
        .string()
        .required()
        .uri()
        .messages({
            'any.required': 'Se requiere una imágen',
            'string.empty': 'Se requiere una imágen',
            'string.uri':'URL inválida'
        }),
    password: Joi
        .string()
        .required()
        .min(8)
        .max(50)
        .messages({
            'string.min':'La contraseña debe tener un minimo de 8 caracteres.',
            'string.max':'La contraseña debe tener un máximo de 50 caracteres.'
        }),
})

export default schema