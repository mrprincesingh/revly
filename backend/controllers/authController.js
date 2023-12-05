import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ErrorHandler  from '../utils/errorHandler.js';
import { catchAsyncError } from '../utils/catchAsyncError.js';
import { sendToken } from '../utils/sendToken.js';


const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role, classGrade, language, specialized } = req.body;

  if (!name || !email || !password || !role || !language) {
    return next(new ErrorHandler('All required fields must be filled.', 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler('Email already exists. Please choose a different email.', 400));
  }

  if (role === 'tutor' && !specialized) {
    return next(new ErrorHandler('Tutors must provide a specialized field.', 400));
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

  // Assuming you have a function `sendToken` that sets the token in the response cookies
  sendToken(res, user, 'Registered Successfully', 201, token);
});





const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if all required fields are present
  if (!email || !password) {
    return next(new ErrorHandler('Email and password are required for login.', 400));
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Assuming you have a function `sendToken` that sets the token in the response cookies
  sendToken(res, user, `Welcome back ${user.name}`, 200, token);
});

 const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export { register, login,logout };
