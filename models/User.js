import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        mail: { type: String, required: true },
        password: { type: String, required: true }, 
        photo: { type: String, required: true },
        is_online: { type: Boolean, required: true },
        is_admin: { type: Boolean, required: true },
        is_author: { type: Boolean, ref:"authors", required: false },
        is_company: { type: Boolean,ref: "companies", required: false },
        is_verified: { type: Boolean, required: true },
        verify_code: { type: String, required: true }
    },{
        timestamps: true
    }
)

let User = mongoose.model('users', schema)
export default User
