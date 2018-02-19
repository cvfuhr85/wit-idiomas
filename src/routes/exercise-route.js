'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/exercise-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorizeAdmin, controller.get);
router.get('/:id', authService.authorize, controller.getById);
router.get('/class/:id', authService.authorize, controller.getByClass);
router.post('/', authService.authorizeAdmin, controller.create);
router.put('/:id', authService.authorizeAdmin, controller.update);
router.put('/active/:id', authService.authorizeAdmin, controller.active);

module.exports = router;