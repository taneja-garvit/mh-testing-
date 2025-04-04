// src/controllers/authController.js
import { User } from '../models/userModel.js';
import { generateToken } from '../utils/authUtils.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import { Readable } from 'stream';

export const register = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  let { transactionHistory } = req.body;

  const photoFile = req.files?.photo ? req.files.photo[0] : null;
  const adhaarCardPhotoFile = req.files?.adhaarCardPhoto ? req.files.adhaarCardPhoto[0] : null;

  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    if (!name || !mobile || !email || !password || !photoFile || !adhaarCardPhotoFile) {
      return res.status(400).json({ message: 'All fields (name, mobile, email, password, photo, adhaarCardPhoto) are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or mobile already exists' });
    }

    // Helper function to upload a Buffer to Cloudinary
    const uploadToCloudinary = (buffer, folder) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null); // End the stream
        readableStream.pipe(stream);
      });
    };

    // Upload photo and adhaarCardPhoto directly from memory
    const photoUpload = await uploadToCloudinary(photoFile.buffer, 'users/photos');
    const adhaarCardPhotoUpload = await uploadToCloudinary(adhaarCardPhotoFile.buffer, 'users/adhaar');

    if (transactionHistory) {
      transactionHistory = JSON.parse(transactionHistory);
      if (!Array.isArray(transactionHistory)) {
        return res.status(400).json({ message: 'Transaction history must be an array' });
      }
    } else {
      transactionHistory = [];
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobile,
      email,
      password: hashedPassword,
      photo: photoUpload.secure_url,
      adhaarCardPhoto: adhaarCardPhotoUpload.secure_url,
      transactionHistory,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
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

