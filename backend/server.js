const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dataBase');
const authRoutes = require('./route/authRoutes');
const doubtRoutes = require('./route/doubtRoutes');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();



// Middleware
app.use(cookieParser());
app.use(cors({ origin: 'https://revly-azure.vercel.app/', credentials: true }));
app.use(express.json());

// Database connection
connectDB();






// Routes
app.use('/auth', authRoutes);
app.use('/doubt', doubtRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
