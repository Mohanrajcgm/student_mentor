const { Schema, model } = require('mongoose');

const mentorSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  assigned_students: [String],
});

module.exports = model('Mentor_Details', mentorSchema);