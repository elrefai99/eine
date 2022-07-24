import { Router } from "express";
import verifyToken from '../config/Auth.config.js'
import {GetCommentController, addCommentController} from '../controller/Comment.controller.js'
const router = Router();

router.post('/Api/AddComment', verifyToken, addCommentController)

router.post('/Api/getComment', verifyToken, GetCommentController)

export default router