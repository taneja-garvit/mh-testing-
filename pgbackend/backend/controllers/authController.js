import {User}  from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/authUtils.js';
import { OAuth2Client } from 'google-auth-library';
import config from '../config.js';  // ✅ Import config from separate file

const client = new OAuth2Client(config.googleClientId);

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, phone, password });
    const token = generateToken(user._id.toString());

    res.status(201).json({
      token,
      user: { id: user._id, name, email, phone }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());
    res.json({
      token,
      user: { id: user._id, name: user.name, email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid Google token');

    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: name || 'Google User',
        email,
        phone: 'N/A',
        password: Math.random().toString(36).slice(-8),
        googleId
      });
    }

    const jwtToken = generateToken(user._id.toString());
    res.json({
      token: jwtToken,
      user: { id: user._id, name: user.name, email, phone: user.phone }
    });
  } catch (error) {
    res.status(401).json({ message: 'Google authentication failed' });
  }
};