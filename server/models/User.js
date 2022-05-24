import mongoose from "mongoose";

const required = true

const userSchema = mongoose.Schema({
    creator:      { type: String, required },
    message:      { type: String, required },
    tags: [String],
    selectedFile: { type: String, required },
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User