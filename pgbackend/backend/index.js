import express from "express";
import { urlencoded } from "express";
import cors from "cors";
import http from "http";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import postroute from "./routes/post.route.js";
import authRoutes from "./routes/authRoutes.js";
import connectdb from "./utils/db.js";
import config from "./config.js";  
import studentRoutes from './routes/studentRoutes.js';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

const corsOptions = {
  origin: config.frontendUrl,
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1", postroute);
app.use("/api/v1", authRoutes);
app.use('/api/v1', studentRoutes);

const port = 8000;
server.listen(port, () => {
  connectdb();
  console.log(`Server running at ${port}`);
});
