'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/class-controller');

router.get('/', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/active/:id', controller.active);

module.exports = router;