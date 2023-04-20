import mongoose from 'mongoose'

let schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        website: { type: String, required: true },
        description: { type: String, required: true },
        user_id: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
        active: { type: Boolean, required: false }
    },{
        timestamps: true
    }
)


export const Company = mongoose.model('companies', schema)

/* 
{
    "name":"pruebassss" ,
    "logo":"pruebassss" ,
    "website":"www.pruebassss.com.ar" ,
    "description":"pruebassss pruebassss pruebassss",
    "user_id":"641b0577188ec0c143199dd8" 
}
*/

