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
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    photo: {
        type: String
    },
    points: {
        type: Number,
        required: true,
        default: 0
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
        default: 'user'
    }]
});

module.exports = mongoose.model('Student', schema);