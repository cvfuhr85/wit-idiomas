'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/challenge-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.get('/:id', authService.authorize, controller.getById);
router.get('/class/:id', authService.authorize, controller.getByClass);
router.post('/', authService.authorizeAdmin, controller.create);
router.put('/:id', authService.authorizeAdmin, controller.update);

module.exports = router;