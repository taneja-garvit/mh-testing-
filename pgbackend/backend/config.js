import dotenv from 'dotenv';

dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET || 'your-secure-secret',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

export default config;
