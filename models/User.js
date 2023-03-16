import mongoose from "mongoose";

let schema = new mongoose.Schema(
   /*  {
        name: {type: String, required: true},
        email: {type: String, requiered: true},
        password: {type: String, requiered: true},
        photo: { type: String },
        is_online: { type: Boolean },
        is_admin: { type: Boolean },
        is_author: { type: Boolean },
        is_company: { type: Boolean },
        is_verified: { type: Boolean, required: true },
        verify_code: { type: String, required: true }
    },{
        timestamps: true
    } */
    {
        mail: { type: String, require: true },
        password: { type: String, require: true },
        photo: { type: String, require: true },
        is_online: { type: Boolean, require: true },
        is_admin: { type: Boolean, require: true },
        is_author: { type: Boolean, require: true },
        is_company: { type: Boolean, require: true },
        is_verified: { type: Boolean, require: true },
        verify_code: { type: String, require: true }
    },{
        timestamps: true
    }
)

let User = mongoose.model('users', schema)
export default User

/* 
"name": "prueba g",
"email": "prueba g",
"password": "prueba g",
"photo": "prueba g"

*/