'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/student-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.get('/:id', controller.getById);
router.get('/class/:id', controller.getByClass);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/active/:id', controller.active);
router.put('/points/:id', controller.addPoints);
router.put('/class/:id', controller.addClass);
router.put('/class/remove/:id', controller.removeClass);

module.exports = router;