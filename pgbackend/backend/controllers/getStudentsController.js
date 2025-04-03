// src/controllers/getStudentsController.js
import { User } from '../models/userModel.js'; // Adjust path to your User model

export const getAllStudents = async (req, res) => {
  try {
    // Fetch only the 'name' field for all users
    const students = await User.find({}, 'name -_id'); // Exclude '_id' field
    const studentNames = students.map(student => student.name);
    res.status(200).json({ students: studentNames });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};