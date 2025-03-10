import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const catSchema = new Schema({
    tittle:
    {
        type: String,
        required: true,
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    
},
    { timestamps: true });

export default mongoose.model('Cat', catSchema);
