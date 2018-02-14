'use strict'

const express = require('express');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

//Connect DB
mongoose.connect(config.connectionString, {
    auth: {
      user: config.userMongo,
      password: config.passwordMongo
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
  
//Import models
const Admin = require('./models/admin');
const Class = require('./models/class');
const Student = require('./models/student');
const Subject = require('./models/subject');
const Exercise = require('./models/exercice');
const Challenge = require('./models/challenge');
// const Interaction = require('./models/interaction');

//Import Routers
const indexRoute = require('./routes/index-route');
const adminRoute = require('./routes/admin-route');
const classRoute = require('./routes/class-route');
const studentRoute = require('./routes/student-route');
const subjectRoute = require('./routes/subject-route');
const exerciseRoute = require('./routes/exercise-route');
const challengeRoute = require('./routes/challenge-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/admin', adminRoute);
app.use('/class', classRoute);
app.use('/student', studentRoute);
app.use('/subject', subjectRoute);
app.use('/exercise', exerciseRoute);
app.use('/challenge', challengeRoute);

module.exports = app;