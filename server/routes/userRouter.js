import express from "express";
import { signIn, signUp } from "../controllers/usersControllers.js";

const userRouter = express.Router();

userRouter.post("/signin", signIn)
userRouter.post("/signup", signUp)

export default userRouter