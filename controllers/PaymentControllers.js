import Payment from "../models/Payment.js"

const controller = {
    create: async (req, res)=>{
        try{
            let controller = await Payment.create(req.body)
            return res.status(201).json({
                success: true, 
                message: "capitulo creado correctamente."
        })
        }catch(error){
            return res.status(400).json({
                success: false,
                message: 'no se pudo crear el capitulo'
            })
        }
    }
}

export default controller