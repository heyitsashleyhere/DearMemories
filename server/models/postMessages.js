import mongoose from "mongoose";

const required = true

const postSchema = mongoose.Schema({
    creator:      { type: String, required },
    message:      { type: String, required },
    tags: [String],
    selectedFile: { type: String, required },
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage