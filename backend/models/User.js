const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'tutor'],
    required: true,
  },
  classGrade: {
    type: String,
    required: function () {
      return this.role === 'student';
    },
  },
  language: {
    type: String,
    required: true,
    
  },
  specialized: {
    type: String,
    enum: ['web-development', 'android-development', 'react-development'],
    required: function () {
      return this.role === 'tutor';
    },
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  doubts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doubt',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
