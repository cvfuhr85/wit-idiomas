'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/student-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorizeAdmin, controller.get);
router.get('/:id', authService.authorize, controller.getById);
router.get('/class/:id', authService.authorize, controller.getByClass);
router.post('/', controller.create);
router.post('/authenticate', controller.authenticate);
router.put('/:id', authService.authorize, controller.update);
router.put('/photo/:id', authService.authorize, controller.uploadPhoto);

module.exports = router;