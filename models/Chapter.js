import mongoose from "mongoose";

let schema = new mongoose.Schema({
    manga_id: { type: mongoose.Types.ObjectId, ref: 'mangas', required: true },
    title: { type: String, required: true },
    cover_photo: { type: String },
    pages: [{ type: String, required: true }],
    order: { type: Number },
},{
    timestamps: true,
})

let Chapther = mongoose.model('chapters', schema)

export default Chapther