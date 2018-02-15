'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/interaction-controller');

router.get('/favorite/:id', controller.getFavorite);
router.get('/subject/:id', controller.getCommentsBySubject);
router.get('/student/:id', controller.getAnswerByStudent);
router.get('/answer/:exerciseId/:studentId', controller.getAnswer);
router.get('/answerclass/:classId/:exerciseId', controller.getAnswerByClass);
router.get('/answerchallenge/:id', controller.getAnswersChallenge);
router.get('/correctanswer/:exerciseId/:studentId', controller.getCorrectAnswer);
router.post('/', controller.create);
router.delete('/:id', controller.delete);

module.exports = router;