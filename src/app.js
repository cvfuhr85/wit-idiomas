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
const User = require('./models/user');
const Class = require('./models/class');
const Student = require('./models/student');
const Subject = require('./models/subject');
const Exercise = require('./models/exercice');
const Challenge = require('./models/challenge');
const Interaction = require('./models/interaction');

//Import Routers
const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');
const classRoute = require('./routes/class-route');
const studentRoute = require('./routes/student-route');
const subjectRoute = require('./routes/subject-route');
const exerciseRoute = require('./routes/exercise-route');
const challengeRoute = require('./routes/challenge-route');
const interactionRoute = require('./routes/interaction-route');


app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/class', classRoute);
app.use('/student', studentRoute);
app.use('/subject', subjectRoute);
app.use('/exercise', exerciseRoute);
app.use('/challenge', challengeRoute);
app.use('/interaction', interactionRoute);

module.exports = app;