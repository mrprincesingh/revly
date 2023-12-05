const Doubt = require('../models/Doubt');
const User = require('../models/User');

const createDoubt = async (req, res) => {
  try {
    const { subject, query, details } = req.body;
    const { userId } = req.user;
    console.log(userId);

    const student = await User.findById(userId);
    if (!student) {
      return res.status(404).json({ error: 'User not found' });
    }

    const doubt = new Doubt({
      student: userId,
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
    tutors.forEach(async (tutor) => {
      tutor.doubts.push(doubt._id);
      await tutor.save();
    });

    res.status(201).json({ message: 'Doubt created successfully', doubt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDoubtHistory = async (req, res) => {
  try {
    const { userId } = req.user;
    const { subject } = req.query;

    let user;

    if (subject) {
      user = await User.findById(userId).populate({
        path: 'doubts',
        match: { subject },
        options: { sort: { createdAt: -1 } },
      });
    } else {
      user = await User.findById(userId).populate({ path: 'doubts', options: { sort: { createdAt: -1 } } });
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
      student.doubts = student.doubts.filter((doubt) => doubt.toString() !== doubtId);
      await student.save();
    }

    // Remove the doubt from the associated tutor(s)' doubts array
    const tutors = await User.find({ role: 'tutor', specialized: doubt.subject });
    tutors.forEach(async (tutor) => {
      tutor.doubts = tutor.doubts.filter((doubt) => doubt.toString() !== doubtId);
      await tutor.save();
    });

    // Remove the doubt from the Doubt collection
    await Doubt.findByIdAndDelete(doubtId);

    res.status(200).json({ message: 'Doubt deleted successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createDoubt, getDoubtHistory, editDoubt, deleteDoubt };
