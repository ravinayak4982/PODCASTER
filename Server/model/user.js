import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    username:
    {
        type: String,
        required: true,
        unique: true,
    },
    password:
    {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true,
        default:'user',
        enum: ['admin', 'user'],
        
    },
    avatar: {
        type: String,
        default: 'https://img.freepik.com/free-photo/modern-city-paper-pretty-walking-casual_1303-3252.jpg?t=st=1741010269~exp=1741013869~hmac=b4b79192765cf7e1bf8c532fa31cf8f68977e5b906dfa74ebaec83d1bb9e2dcd&w=1800',
    },
    favouriteBlogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    likedBlogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],

}, { timestamps: true });
export default mongoose.model('User', UserSchema);
