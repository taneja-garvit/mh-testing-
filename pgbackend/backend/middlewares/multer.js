import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadImages = upload.array('images', 10); // 'images' is the field name, and 10 is the max number of files

export default upload;
