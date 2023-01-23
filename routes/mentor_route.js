const mentorDetails = require('../models/mentors');
const express = require('express');
const router = express.Router();

// To get all mentors
router.get('/mentors', (req, res) => {
  try {
    mentorDetails.find((err, data) => {
      if (err) {
        res.status(403).json('An error accured while getting mentors');
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    res.status(500).json('Internal server error');
    console.log('something went wrong', error);
  }
});

// To show all students for paticular mentors
router.get('/mentor/:id', (req, res) => {
  try {
    mentorDetails.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res
          .status(403)
          .send(
            'An error occured while getting students with particular mentors.'
          );
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    res.status(500).json('Internal server error');
    console.log('something went wrong', error);
  }
});

// To create a menotr
router.post('/mentor', (req, res) => {
  let payload = req.body;
  console.log('Payload ', payload);

  if (Array.isArray(payload)) {
    try {
      console.log('Payload Array: ', payload);
      mentorDetails.insertMany(payload, (err, data) => {
        if (err) {
          return res.status(401).send(err);
        }

        return res.status(201).send(data);
      });
    } catch (err) {
      console.log(err);
    }
  } else if (typeof payload === 'object') {
    try {
      let mentor = new mentorDetails(payload);
      mentor.save((err, data) => {
        if (err) {
          console.log(err);
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
  }
});

// To assign students to mentor

router.put('/assign-students/:id', (req, res) => {
  //  already assigned students not shown for particular mentor
  // assigned students id not duplicated
  // if the student not assigned to that mentor then set to assign
  try {
    if (mentorDetails.assigned_students == []) {
      mentorDetails.findOneAndUpdate(
        {
          _id: req.params.id,
        },

        {
          $addToSet: {
            assigned_students: {
              $each: req.body.assigned_students,
            },
          },
        },
        { new: true },

        (err, mentor) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              error: 'Error while updating or assigning students',
            });
          } else {
            return res.status(201).json(mentor);
          }
        }
      );
    }

    // if student is assign then update that student
    else {
      mentorDetails.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            assigned_students: req.body.assigned_students,
          },
        },
        { new: true },
        (err, mentors) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              error: 'Error while updating or assigning students',
            });
          } else {
            return res.status(201).json(mentors);
          }
        }
      );
    }
  } catch (error) {
    res.status(500).send('Internal server error');
    console.log('something went wrong', error);
  }
});

module.exports = router;