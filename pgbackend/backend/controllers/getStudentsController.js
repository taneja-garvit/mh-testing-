// src/controllers/getStudentsController.js
import { User } from '../models/userModel.js'; // Adjust path to your User model

export const getAllStudents = async (req, res) => {
  try {
    // Fetch only 'name', 'phone', and 'email' fields, exclude '_id'
    const students = await User.find({}, 'name phone email -_id');
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};