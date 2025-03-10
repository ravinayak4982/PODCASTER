import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    tittle:
    {
        type: String,
        required: true,
    },
    desc:
    {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required:true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
       
    },
    favouriteBlogByUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likedBlogByUser: [{ type: Schema.Types.ObjectId, ref: "User" }],

}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
