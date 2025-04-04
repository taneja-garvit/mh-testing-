// src/routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';
import { upload } from '../middlewares/fileUpload.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.post('/register', limiter, upload, register);
router.post('/login', limiter, login);

export default router;