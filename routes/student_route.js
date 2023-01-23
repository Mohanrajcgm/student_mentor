const studentDetails = require('../models/students');
const express = require('express');
const router = express.Router();

// Homepage
router.get('/', (req, res) => {
  res.status(200).send(`
  \nWelcome to my APP😊,
  `);
});

// To get all the students
router.get('/students', (req, res) => {
  try {
    studentDetails.find((err, data) => {
      if (err) {
        res.status(403).json('An error accured while getting students');
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    res.status(500).json('Internal server error');
    console.log('something went wrong', error);
  }
});

// To create a student
router.post('/student', (req, res) => {
  try {
    let student = new studentDetails(req.body);
    student.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'Data is not inserted properly' });
      } else {
        res.status(201).json(data);
      }
    });
  } catch (error) {
    res.status(500).send('Internal server error');
    console.log('something went wrong', error);
  }
});

// To assign a mentor to student or change mentor

router.put('/assign-mentor/:id', (req, res) => {
  try {
    studentDetails.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
      (err, student) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: 'Error while updating or assigning mentor',
          });
        } else {
          return res.status(201).json(student);
        }
      }
    );
  } catch (error) {
    res.status(500).send('Internal server error');
    console.log('something went wrong', error);
  }
});
module.exports = router;