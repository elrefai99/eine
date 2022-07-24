import { Router } from "express";
import {RegisterController, LoginController} from '../controller/Auth.controller.js' 
const router = Router();

// Register
router.post('/api/register', RegisterController)

// Login
router.post('/api/login', LoginController);

export default router