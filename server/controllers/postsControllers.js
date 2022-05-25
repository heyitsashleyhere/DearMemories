import mongoose from "mongoose";
import Post from "../models/Post.js"

export async function getPosts(req, res) {
    try {
        const post = await Post.find();
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} 

export async function createPost(req, res) {
    const post = req.body;
    const newPost = new Post(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        console.log('error :>> ', error);
        res.status(409).json({ message: error.message })
    }
}

export async function updatePost(req, res) {
    const { id:_id } = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id')
    }

    console.log(req.body);
    const updatedPost = await Post.findByIdAndUpdate(_id, req.body, { new: true })
    res.json({message: 'Updated'})
}

export async function deletePost(req, res) {
    const { id:_id } = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id')
    }

    await Post.findByIdAndDelete(_id)
    res.json({ message: "Deleted"})
}

export async function likePost(req, res) {
    const { id:_id } = req.params

    if(!req.userId) {
        return res.status(401).json({ message: "Unauthenticated"})
    }

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id')
    }

    const post = await Post.findById(_id)

    const index = post.likes.findIndex(id => id === String(req.userId))
    if(index === -1) {
        // like
        post.likes.push(req.userId)
    } else {
        // dislike
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }

    // remove: { likeCount: post.likeCount + 1}
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true })
    res.json({message: "Liked"})
}