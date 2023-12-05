
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Doubt from '../models/Doubt.js'; // Assuming you have the Doubt model imported
import { catchAsyncError } from '../utils/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
const createDoubt = catchAsyncError(async (req, res, next) => {
  try {
    const { subject, query, details } = req.body;
    const { _id } = req.user;
    console.log('userId:', _id);
    console.log('req.user:', req.user);
    const student = await User.findById(_id);
    console.log('Student:', student);
    if (!student) {
      return next(new ErrorHandler('User not found', 404));
    }

    const doubt = new Doubt({
      student: _id,
      subject,
      query,
      details,
      status: 'pending',
    });

    await doubt.save();

    // Associate the doubt with the student by pushing its _id to the doubts array
    student.doubts.push(doubt._id);
    await student.save();

    // Find all tutors with the matching specialized field
    const tutors = await User.find({ role: 'tutor', specialized: subject });

    // Associate the doubt with each tutor by pushing its _id to the doubts array
    for (const tutor of tutors) {
      tutor.doubts.push(doubt._id);
      await tutor.save();
    }

    res.status(201).json({ message: 'Doubt created successfully', doubt });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler('Internal Server Error', 500));
  }
});


const getDoubtHistory = async (req, res) => {
  try {
    const { _id } = req.user;
    const { subject } = req.query;

    let user;

    if (subject) {
      user = await User.findById(_id).populate({
        path: 'doubts',
        match: { subject },
        options: { sort: { createdAt: -1 } },
      });
    } else {
      user = await User.findById(_id).populate({ path: 'doubts', options: { sort: { createdAt: -1 } } });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const doubts = user.doubts;
    res.status(200).json({ doubts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editDoubt = async (req, res) => {
  try {
    const { doubtId } = req.params;
    const { query, details } = req.body;

    const doubt = await Doubt.findById(doubtId);
    if (!doubt) {
      return res.status(404).json({ error: 'Doubt not found' });
    }

    doubt.query = query;
    doubt.details = details;

    await doubt.save();

    res.status(200).json({ message: 'Doubt updated successfully', doubt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteDoubt = async (req, res) => {
  try {
    const { doubtId } = req.params;

    const doubt = await Doubt.findById(doubtId);
    if (!doubt) {
      return res.status(404).json({ error: 'Doubt not found' });
    }

    // Remove the doubt from the associated student's doubts array
    const student = await User.findById(doubt.student);
    if (student) {
      student.doubts = student.doubts.filter((d) => d.toString() !== doubtId);
      await student.save();
    }

    // Remove the doubt from the associated tutor(s)' doubts array
    const tutors = await User.find({ role: 'tutor', specialized: doubt.subject });
    for (const tutor of tutors) {
      tutor.doubts = tutor.doubts.filter((d) => d.toString() !== doubtId);
      await tutor.save();
    }

    // Remove the doubt from the Doubt collection
    await Doubt.findByIdAndDelete(doubtId);

    res.status(200).json({ message: 'Doubt deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createDoubt, getDoubtHistory, editDoubt, deleteDoubt };
