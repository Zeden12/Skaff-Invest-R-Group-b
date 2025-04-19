const mongoose = require('mongoose');

const careerApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  phone: {
    type: String,
    required: false
  },
  interests: {
    type: String,
    required: [true, 'Areas of interest are required']
  },
  resumePath: {
    type: String,
    required: [true, 'Resume is required']
  },
  consent: {
    type: Boolean,
    required: [true, 'You must agree to the terms'],
    validate: {
      validator: (value) => value === true,
      message: 'You must agree to the terms'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);