import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/postsControllers.js";

const postRouter = express.Router();

postRouter.get("/", getPosts)
postRouter.post("/", createPost)
postRouter.patch("/:id", updatePost)

export default postRouter