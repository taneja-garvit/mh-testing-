import jwt from 'jsonwebtoken';
import config from '../config.js';  // ✅ Import config from separate file

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Fixed typo
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};