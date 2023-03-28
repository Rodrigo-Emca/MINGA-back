import express from 'express';
import mercadopago from 'mercadopago';
import passport from 'passport'

const router = express.Router();

mercadopago.configure({access_token: process.env.ACCESS_TOKEN})

router.post('/', passport.authenticate('jwt',{session:false}), (req, res) => {
    const donat = req.body;

    let preference = {
        items: [{
            // id: 123,
            title: donat.title,
            currency_id: 'ARS',
            picture_url: donat.image,
            description: donat.description,
            category_id: 'donation',
            quantity: 1,
            unit_price: donat.price,
        }],
        back_urls: {
            success: 'http://localhost:3000',
            failure: '',
            pending: '',
        },
        auto_return: 'approved',
        binary_mode: true,
    }
    mercadopago.preferences.create(preference)
        .then((response)=>res.status(200).send({response}))
        .catch((error)=>
        res.status(400).send({error: error.message}))
});

export default router;