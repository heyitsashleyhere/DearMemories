import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/postsControllers.js";
import authHandler from '../middleware/authHandler.js'

const postRouter = express.Router();

postRouter.get("/", getPosts)
          .post("/", authHandler, createPost)
          .patch("/:id", authHandler, updatePost)
          .delete("/:id", authHandler, deletePost)
          .patch("/:id/likePost", authHandler, likePost)

export default postRouter