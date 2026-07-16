import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js';
const router = Router();
router.post('/auth/register', userController.register);
router.post('/auth/login', authController.login);
export default router;
