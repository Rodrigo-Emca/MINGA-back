/* import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    birthdate: Joi.date(),
    imageUrl: Joi.string()
})

export default schema; */

import Joi from 'joi';
const schema = Joi.object({
    name: Joi.string().required().min(5).max(15).messages({
        "string.min": "The name must have at least 5 characters",
        "string.max": "The name must have a maximum of 15 characters",
    }),
    last_name: Joi.string().min(6).max(25).messages({
        "string.min": "The last name must have at least 6 characters",
        "string.max": "The last name must have a maximum of 25 characters",
    }),
    city: Joi.string().max(60).messages({
        "string.max": "The city must have a maximum of 60 characters",
    }),
    country: Joi.string().max(60).messages({
        "string.max": "The country must have a maximum of 60 characters",
    }),
    date: Joi.date().less("now").messages({
        invalid: "Not a date",
        "date.less": "The date is greater than the current date",
    }),
    photo: Joi.string().min(8).messages({
        "string.min": "The photo url must have at least 8 characters",
    }),
    active: Joi.boolean().messages({
        invalid: "Not a Boolean",
    }),
});

export default schema;