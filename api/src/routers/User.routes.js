import { Router } from "express";
import verifyToken from '../config/Auth.config.js'
import {GetUser,SearchController, DeleteUserController, FollowUserController, UnfollowUserController} from '../controller/User.controller.js'
const router = Router();


// Get User
router.get('/Api/GetUser', verifyToken, GetUser)

// Update User


// Delete User
router.delete('/Api/DeleteUser', verifyToken, DeleteUserController );

// following User
router.put('/Api/:id/follow', verifyToken, FollowUserController)

// Remove follow
router.put('/api/:id/unfollow', verifyToken, UnfollowUserController)

// Search
router.get('/Api/Search', SearchController)
export default router