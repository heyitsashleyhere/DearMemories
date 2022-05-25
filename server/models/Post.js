import mongoose from "mongoose";

const { Schema, model } = mongoose
const required = true
// const lowercase = true

const postSchema = Schema({
    user:         { type: Schema.Types.ObjectId, ref: "user", required },
    message:      { type: String, required },
    tags:         { type: Array },
    selectedFile: { type: String, required },
    likes: {
        type: [String],
        default: []
    }
}, { timestamps: true })

const Post = model("Post", postSchema)

export default Post