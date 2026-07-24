import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getMe, updateUser } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/update', protect, updateUser);

export default router;
