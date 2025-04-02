// src/utils/authUtils.js
import jwt from 'jsonwebtoken';
import config from '../config.js';  // ✅ Import config from separate file

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '7d' });
};