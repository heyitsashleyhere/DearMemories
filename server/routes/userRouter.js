import express from "express";
import { signIn, signUp } from "../controllers/usersControllers.js";

const userRouter = express.Router();

userRouter.post("/signin", signIn)
userRouter.post("/signup", signUp)
// userRouter.get("/allusers", async (req, res) => {
//     const users = await User.find()
//     console.log(users);
// })

export default userRouter