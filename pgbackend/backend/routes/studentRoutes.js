// src/routes/studentRoutes.js
import express from 'express';
import { getAllStudents } from '../controllers/getStudentsController.js'; // Adjust path


const router = express.Router();

router.get('/students', getAllStudents);

export default router;