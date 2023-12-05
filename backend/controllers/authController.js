const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const register = async (req, res) => {
  try {
    const { name, email, password, role, classGrade, language, specialized } = req.body;

    if (!name || !email || !password || !role || !language) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists. Please choose a different email.' });
    }

    if (role === 'tutor' && !specialized) {
      return res.status(400).json({ error: 'Tutors must provide a specialized field.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      classGrade: role === 'student' ? classGrade : undefined,
      language,
      specialized: role === 'tutor' ? specialized : undefined,
      isOnline: false,
      doubts: [],
    });

    await user.save();

    // Populate the doubts array with actual doubt documents
    const populatedUser = await User.findById(user._id).populate('doubts');
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '23h' });

    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });

    res.status(201).json({ user: populatedUser, token });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required for login.' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });


    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register, login };
