// src/models/userModel.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  paymentDate: {
    type: Date,
    required: true,
  },
  referenceId: {
    type: String,
    required: true,
  },
  screenshotProof: {
    type: String, // Cloudinary URL for screenshot
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid mobile number'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  photo: {
    type: String, // Cloudinary URL
    required: [true, 'Photo is required'],
  },
  adhaarCardPhoto: {
    type: String, // Cloudinary URL
    required: [true, 'Aadhaar card photo is required'],
  },
  transactionHistory: [transactionSchema], // Array of transactions
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);