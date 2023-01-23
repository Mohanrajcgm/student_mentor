// dotenv environment setup
require('dotenv').config();
const express = require('express');
const connect = require('./connect');
const studentRoute = require('./routes/student_route');
const mentorRoute = require('./routes/mentor_route');

 // connect to the database
connect();

// web server
const app = express();
app.use(express.json());

// To connected with routes
app.use('/', studentRoute);
app.use('/', mentorRoute);

let port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.log(`The App is running on the port ${port}`);
 
});