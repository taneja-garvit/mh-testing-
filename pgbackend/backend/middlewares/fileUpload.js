// src/middleware/fileUpload.js
import multer from 'multer';

// Configure in-memory storage
const storage = multer.memoryStorage();

// File filter for images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(file.originalname.toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  console.log(`File: ${file.fieldname}, Original: ${file.originalname}, Extname: ${extname}, MIME: ${file.mimetype}, Size: ${file.size} bytes`);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG images are allowed'));
  }
};

// Multer setup
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
}).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'adhaarCardPhoto', maxCount: 1 },
]);