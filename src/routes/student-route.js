'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/student-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorizeAdmin, controller.get);
router.get('/:id', authService.authorize, controller.getById);
router.get('/class/:id', authService.authorize, controller.getByClass);
router.post('/', controller.create);
router.put('/:id', authService.authorize, controller.update);
router.put('/active/:id', authService.authorizeAdmin, controller.active);
router.put('/points/:id', authService.authorizeAdmin, controller.addPoints);
router.put('/class/:id', authService.authorizeAdmin, controller.addClass);
router.put('/class/remove/:id', authService.authorizeAdmin, controller.removeClass);

module.exports = router;