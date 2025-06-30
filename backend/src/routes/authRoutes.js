import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { getProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getProfile); 

export default router;
