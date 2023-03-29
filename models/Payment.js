import mongoose from 'mongoose'

let schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true }
    },{
        timestamps: true
    }
)

let Payment = mongoose.model("payments", schema)
export default Payment