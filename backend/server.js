
import express from 'express';
import cors from 'cors';
import connectDB from './config/dataBase.js';
import authRoutes from './route/authRoutes.js'; 
import doubtRoutes from './route/doubtRoutes.js'; 
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { ErrorMiddleware } from './utils/Error.js';

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/doubt', doubtRoutes);

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;


app.use(ErrorMiddleware)