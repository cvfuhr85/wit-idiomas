'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: true,
        enum: ['active', 'deactivated'],
        default: 'active'
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'admin'
    }]
});

module.exports = mongoose.model('User', schema);