'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin-controller');

router.post('/', controller.create);
router.post('/authenticate', controller.authenticate);

module.exports = router;