import mongoose from "mongoose";

const { Schema, model } = mongoose
const required = true
const trim = true
const unique = true

const userSchema = new Schema({
    firstName: { type: String, required, trim },
    lastName:  { type: String, required, trim },
    email:     { type: String, required, unique },
    password:  { type: String, required },
    posts:     { type: [Schema.Types.ObjectId], ref: "posts" }

}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User