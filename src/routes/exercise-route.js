'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/exercise-controller');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/class/:id', controller.getByClass);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/active/:id', controller.active);

module.exports = router;