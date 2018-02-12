'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin-controller');

router.post('/', controller.create);

module.exports = router;