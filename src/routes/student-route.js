'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/student-controller');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/class/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/active/:id', controller.active);
router.put('/points/:id', controller.addPoints);
router.put('/class/:id', controller.addClass);

module.exports = router;