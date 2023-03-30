import mercadopago from 'mercadopago';
mercadopago.configure({access_token: process.env.ACCESS_TOKEN})

const donationController = {
    createPayment: async (req, res)=>{
        const donat = req.body;

        let preference = {
            items: [{
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
                failure: 'http://localhost:3000',
                pending: '',
            },
            auto_return: 'approved',
            binary_mode: true,
        }
        mercadopago.preferences.create(preference)
            .then((response)=>res.status(200).send({response}))
            .catch((error)=>
            res.status(400).json({
                success: false,
                message: 'no se pudo enviar la petición',
                message: error
            })
            )
    }
}

export default donationController