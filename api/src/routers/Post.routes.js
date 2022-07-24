import { Router } from "express";
import {CreatePostController, UpdatePostController, timelinePostController, LikePostController, DeletePostController, getPostIdController} from '../controller/Post.controller.js'
import verifyToken from '../config/Auth.config.js'

const router = Router();

// Create a new Post
router.post('/api/createPost', verifyToken, CreatePostController)

// Update a post
router.put('/api/:id/updatePost', verifyToken, UpdatePostController)

//delete a post
router.delete('/api/:id/deletePost', verifyToken, DeletePostController)

//like a post
router.put('/api/:id/likePost', verifyToken, LikePostController);

//get a post
router.get('/api/Post/:id', verifyToken, getPostIdController);

//get timeline posts
router.get('/api/Timeline/all', verifyToken, timelinePostController)

export default router