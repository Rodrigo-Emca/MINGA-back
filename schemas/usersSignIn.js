import Joi from 'joi-oid'

const schema = Joi.object({
    mail: Joi
        .string()
        .required()
        .email({minDomainSegments: 2})
        .messages({
            'any.required': 'No se ha ingresado un mail válido',
            'string.empty': 'No se ha ingresado ningún mail.',
            'string.mail': 'El mail ingresado es inválido.'
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