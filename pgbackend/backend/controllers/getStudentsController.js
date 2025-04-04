// src/controllers/getStudentsController.js
import { User } from '../models/userModel.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({}, 'name mobile email -_id');
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};