const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
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
  assigned_mentor_id: String,
});

module.exports = model('student_details', studentSchema);