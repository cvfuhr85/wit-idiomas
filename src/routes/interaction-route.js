'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/interaction-controller');
const authService = require('../services/auth-service');

router.get('/favorite/:id', authService.authorize, controller.getFavorite);
router.get('/subject/:id', authService.authorize, controller.getCommentsBySubject);
router.get('/student/:id', authService.authorize, controller.getAnswerByStudent);
router.get('/answer/:exerciseId/:studentId', authService.authorize, controller.getAnswer);
router.get('/answerclass/:classId/:exerciseId', authService.authorize, controller.getAnswerByClass);
router.get('/answerchallenge/:id', authService.authorize, controller.getAnswersChallenge);
router.get('/correctanswer/:exerciseId/:studentId', authService.authorize, controller.getCorrectAnswer);
router.post('/', authService.authorize, controller.create);
router.put('/:id', authService.authorize, controller.corrected);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router; 